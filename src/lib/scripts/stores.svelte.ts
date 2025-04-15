import { invoke } from "@tauri-apps/api/core";

import type { BarbellWeight, Preferences, Score, Scores, Theme } from "$lib/types";
import { toAbbreviation } from "./util";

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
    getWeightUnitsAbbreviation: (plural: boolean = false) => {
      if (preferences) {
        return toAbbreviation(preferences.weightUnits, plural);
      } else {
        return toAbbreviation("Pounds", plural);
      }
    },
    setUp: async () => {
      preferences = (await invoke("get_preferences")) as Preferences;
    },
  };
}
export const preferences = setUpPreferences();

function setUpScores() {
  let scores: Scores | undefined = $state();
  return {
    get: () => {
      return scores as Scores;
    },
    getScore: (movement: string): Score => {
      if (scores) {
        const score = scores.scores[movement];
        if (score) {
          return score;
        }
      }
      return {
        score: 0,
        scoreType: "Weight",
      };
    },
    setScore: (movement: string, score: Score | undefined) => {
      if (scores) {
        scores.scores[movement] = score
          ? score
          : {
              score: 0,
              scoreType: "Weight",
            };
      }
    },
    removeScore: (movement: string) => {
      if (scores) {
        scores.scores[movement] = undefined;
      }
    },
    setUp: async () => {
      scores = (await invoke("get_scores")) as Scores;
    },
  };
}
export const scores = setUpScores();
