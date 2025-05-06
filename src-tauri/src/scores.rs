use std::{collections::HashMap, sync::Mutex};

use jiff::civil::Date;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, State};
use tauri_plugin_store::StoreExt;

use crate::{store::StoreInterface, util::DatedEntries};

macro_rules! movement_map {
    ($($name:literal),+ $(,)?) => {
        HashMap::from([
            $((String::from($name), Movement::new_weight(String::from($name)))),+
        ])
    };
}

#[derive(Clone, Serialize, Deserialize)]
pub struct Scores {
    movements: HashMap<String, Movement>,
    scores: HashMap<String, ScoreData>,
}

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct Movement {
    name: String,
    #[serde(rename(serialize = "scoreType"), alias = "scoreType", default)]
    score_type: ScoreType,
}

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct ScoreData {
    scores: Vec<Score>,
}

#[derive(Clone, Copy, Serialize, Deserialize, Hash, PartialEq, Eq)]
pub struct CommonScore {
    date: Option<Date>,
}

#[derive(Clone, Copy, Serialize, Deserialize, Hash, PartialEq, Eq)]
#[serde(tag = "type")]
pub enum Score {
    Weight {
        weight: u32,
        reps: u32,
        sets: Option<u32>,
        #[serde(flatten)]
        common: CommonScore,
    },
}

#[derive(Clone, Copy, Default, Serialize, Deserialize)]
pub enum ScoreType {
    #[default]
    Weight,
}

impl Scores {
    fn add_movements_to_score(&mut self) {
        for name in self.movements.keys() {
            if !self.scores.contains_key(name) {
                self.scores.insert(name.clone(), ScoreData::default());
            }
        }
    }
}

impl Movement {
    fn new_weight(name: String) -> Self {
        Movement {
            name,
            score_type: ScoreType::Weight,
        }
    }
}

impl Default for Scores {
    fn default() -> Self {
        Self {
            movements: movement_map![
                "Back Squat",
                "Bench Press",
                "Deadlift",
                "Front Squat",
                "Full Clean",
                "Hang Power Clean",
                "Overhead Squat",
                "Power Clean",
                "Push Jerk",
                "Push Press",
                "Snatch",
                "Split Jerk",
                "Strict Press",
                "Sumo Deadlift",
                "Sumo Deadlift High Pull",
            ],
            scores: Default::default(),
        }
    }
}

impl Default for Score {
    fn default() -> Self {
        Score::Weight {
            weight: 0,
            reps: 1,
            sets: None,
            common: CommonScore { date: None },
        }
    }
}

impl StoreInterface<Scores> for Scores {
    fn get_store_key() -> String {
        String::from("scores")
    }
}

#[tauri::command]
pub fn get_scores(scores: State<Mutex<Scores>>) -> Scores {
    if let Ok(mut scores) = scores.lock() {
        scores.add_movements_to_score();
        scores.clone()
    } else {
        panic!("Score state was poisoned.")
    }
}

#[tauri::command]
pub fn save_scores(frontend_scores: Scores, scores: State<Mutex<Scores>>, app_handle: AppHandle) {
    if let Ok(mut scores) = scores.lock() {
        let store = app_handle.store("data.json").expect("Couldn't load store.");
        *scores = frontend_scores;
        scores.set_store_value(store);
    }
}

#[tauri::command]
pub fn remove_all_scores(scores: State<Mutex<Scores>>) {
    if let Ok(mut scores) = scores.lock() {
        *scores = Scores::default();
    }
}

#[tauri::command]
pub fn sort_scores_by_date(
    movement: String,
    scores: State<Mutex<Scores>>,
) -> Vec<DatedEntries<Score>> {
    let mut entries: HashMap<Option<Date>, Vec<Score>> = HashMap::new();

    if let Ok(scores) = scores.lock() {
        if let Some(scores) = scores.scores.get(&movement) {
            for score in &scores.scores {
                match score {
                    Score::Weight {
                        weight: _,
                        reps: _,
                        sets: _,
                        common,
                    } => {
                        if let Some(entry) = entries.get_mut(&common.date) {
                            entry.push(*score);
                        } else {
                            entries.insert(common.date, vec![*score]);
                        }
                    }
                }
            }
        }
    }

    let mut dated_entries: Vec<DatedEntries<Score>> = entries
        .iter()
        .map(|(date, scores)| {
            let mut dated_entries = DatedEntries::new(*date);

            for score in scores {
                dated_entries.add_entry(*score);
            }

            dated_entries
        })
        .collect();

    dated_entries.sort_by(|entry_a, entry_b| entry_a.date().cmp(&entry_b.date()).reverse());
    dated_entries
}
