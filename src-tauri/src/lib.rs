use std::sync::Mutex;

use preferences::Preferences;
use store::StoreInterface;
use tauri::{Manager, generate_handler};
use tauri_plugin_store::StoreExt;

mod preferences;
mod store;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let store = app.store("data.json")?;

            app.manage(Mutex::new(Preferences::from_store(store.clone())));

            Ok(())
        })
        .invoke_handler(generate_handler![
            preferences::get_preferences,
            preferences::save_preferences
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
