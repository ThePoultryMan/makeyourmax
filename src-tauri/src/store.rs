use std::sync::Arc;

use serde::{Serialize, de::DeserializeOwned};
use tauri::Wry;

pub type Store = Arc<tauri_plugin_store::Store<Wry>>;

pub trait StoreInterface<T: Default + Serialize + DeserializeOwned + StoreInterface<T>> {
    fn from_store(store: &Store) -> T {
        if let Some(json_value) = store.get(Self::get_store_key()) {
            if let Ok(value) = serde_json::from_value(json_value) {
                value
            } else {
                store.delete(Self::get_store_key());
                T::default()
            }
        } else {
            T::default()
        }
    }

    fn set_store_value(&self, store: Store)
    where
        Self: Serialize,
    {
        store.set(
            Self::get_store_key(),
            serde_json::to_value(self).unwrap_or_else(|_| {
                panic!(
                    "{}",
                    format!("failed to serialize {} in data.json", Self::get_store_key())
                )
            }),
        );
        store.save().unwrap();
    }

    fn get_store_key() -> String;
}
