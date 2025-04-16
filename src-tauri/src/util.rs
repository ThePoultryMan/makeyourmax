use std::sync::Mutex;

use tauri::State;

use crate::preferences::{Preferences, WeightUnit};

#[tauri::command]
pub fn calculate_plates(
    weight: u32,
    barbell_weight: u32,
    preferences: State<Mutex<Preferences>>,
) -> Vec<f64> {
    let mut plates = Vec::new();
    if let Ok(preferences) = preferences.lock() {
        let available_plates = if preferences.weight_units() == WeightUnit::Pounds {
            vec![45.0, 25.0, 15.0, 10.0, 5.0, 2.5]
        } else {
            vec![20.0, 15.0, 10.0, 5.0, 2.5, 1.25]
        };

        let mut remaining_weight = weight.saturating_sub(barbell_weight) as f64 / 2.0;
        while remaining_weight > 0.0 {
            for plate in &available_plates {
                if *plate <= remaining_weight {
                    plates.push(*plate);
                    remaining_weight -= plate;
                    break;
                } else if remaining_weight < *available_plates.last().unwrap()
                    && remaining_weight > 0.0
                {
                    plates.push(remaining_weight);
                    remaining_weight = 0.0;
                }
            }
        }
    }
    plates
}
