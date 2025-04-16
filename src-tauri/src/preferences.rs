use std::sync::Mutex;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, State};
use tauri_plugin_store::StoreExt;

use crate::store::StoreInterface;

#[derive(Clone, Serialize, Deserialize)]
pub struct Preferences {
    #[serde(
        rename(serialize = "showMaxOnPrPage"),
        alias = "showMaxOnPrPage",
        default
    )]
    show_max_on_pr_page: bool,
    #[serde(
        rename(serialize = "defaultBarbellWeight"),
        alias = "defaultBarbellWeight",
        default
    )]
    default_barbell_weight: u32,
    #[serde(rename(serialize = "weightUnits"), alias = "weightUnits", default)]
    weight_units: WeightUnit,
    #[serde(default)]
    theme: Theme,
}

#[derive(Clone, Copy, Default, Serialize, Deserialize, PartialEq)]
pub enum WeightUnit {
    #[default]
    Pounds,
    Kilograms,
}

#[derive(Clone, Copy, Default, Serialize, Deserialize)]
pub enum Theme {
    #[default]
    MyProd,
}

impl Preferences {
    pub fn weight_units(&self) -> WeightUnit {
        self.weight_units
    }
}

impl Default for Preferences {
    fn default() -> Self {
        Self {
            show_max_on_pr_page: true,
            default_barbell_weight: 45,
            theme: Theme::default(),
            weight_units: WeightUnit::default(),
        }
    }
}

impl StoreInterface<Preferences> for Preferences {
    fn get_store_key() -> String {
        "preferences".to_owned()
    }
}

#[tauri::command]
pub fn get_preferences(preferences: State<Mutex<Preferences>>) -> Preferences {
    if let Ok(preferences) = preferences.lock() {
        preferences.clone()
    } else {
        panic!("Preferences state was poisoned.")
    }
}

#[tauri::command]
pub fn save_preferences(
    frontend_preferences: Preferences,
    preferences: State<Mutex<Preferences>>,
    app_handle: AppHandle,
) {
    if let Ok(mut preferences) = preferences.lock() {
        let store = app_handle.store("data.json").expect("Couldn't load store.");
        *preferences = frontend_preferences;
        preferences.set_store_value(store);
    }
}
