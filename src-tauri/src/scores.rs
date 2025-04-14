use std::{collections::HashMap, sync::Mutex};

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, State};
use tauri_plugin_store::StoreExt;

use crate::store::StoreInterface;

#[derive(Clone, Serialize, Deserialize)]
pub struct Scores {
    movements: Vec<String>,
    scores: HashMap<String, Score>,
}

#[derive(Clone, Copy, Default, Serialize, Deserialize)]
pub struct Score {
    score: u32,
    #[serde(rename(serialize = "scoreType"), alias = "scoreType")]
    score_type: ScoreType,
}

#[derive(Clone, Copy, Default, Serialize, Deserialize)]
pub enum ScoreType {
    #[default]
    Weight,
}

impl Default for Scores {
    fn default() -> Self {
        Self {
            movements: vec![
                String::from("Back Squat"),
                String::from("Bench Press"),
                String::from("Deadlift"),
                String::from("Front Squat"),
                String::from("Full Clean"),
                String::from("Hang Power Clean"),
                String::from("Overhead Squat"),
                String::from("Power Clean"),
                String::from("Push Jerk"),
                String::from("Push Press"),
                String::from("Snatch"),
                String::from("Split Jerk"),
                String::from("Strict Press"),
                String::from("Sumo Deadlift"),
                String::from("Sumo Deadlift High Pull"),
            ],
            scores: Default::default(),
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
