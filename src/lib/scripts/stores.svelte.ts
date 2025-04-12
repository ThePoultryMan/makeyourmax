import { invoke } from "@tauri-apps/api/core";

import type { BarbellWeight, Preferences, Theme } from "$lib/types";

function setUpPreferences() {
  let preferences: Preferences | undefined = $state();
  return {
    get: (): Preferences => {
      return preferences as Preferences;
    },
    setTheme: (theme: Theme) => {
      if (preferences) {
        preferences.theme = theme;
      }
    },
    setDefaultBarbellWeight: (barbellWeight: BarbellWeight) => {
      if (preferences) {
        preferences.defaultBarbellWeight = barbellWeight;
      }
    },
    setUp: async () => {
      preferences = (await invoke("get_preferences")) as Preferences;
    },
  };
}

export const preferences = setUpPreferences();
