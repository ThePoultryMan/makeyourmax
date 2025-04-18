use std::{collections::HashMap, sync::Mutex};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, State};
use tauri_plugin_store::StoreExt;

use crate::store::StoreInterface;

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
    highest: Option<Score>,
    scores: Vec<Score>,
}

#[derive(Clone, Copy, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum Score {
    Weight {
        weight: u32,
        reps: u32,
        sets: Option<u32>,
    },
}

#[derive(Clone, Copy, Default, Serialize, Deserialize)]
pub enum ScoreType {
    #[default]
    Weight,
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
    if let Ok(scores) = scores.lock() {
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
