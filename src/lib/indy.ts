import { Preferences } from "@capacitor/preferences";
import { writable } from "svelte/store";

class Storage {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public fromObject(object: any) {
    this.clear();
    for (const [key, value] of object) {
      this.setItem(key, value);
    }
  }

  public async getItem(key: string) {
    return JSON.parse((await Preferences.get({ key: this.name + "_" + key })).value as string);
  }

  public async setItem(key: string, value: any) {
    Preferences.set({
      key: this.name + "_" + key,
      value: JSON.stringify(value),
    });
  }

  public async getKeys() {
    const keys: string[] = [];
    (await Preferences.keys()).keys.forEach((key) => {
      if (key.startsWith(this.name + "_")) {
        keys.push(key.replace(this.name + "_", ""));
      }
    });
    return keys;
  }

  public async clear() {
    (await Preferences.keys()).keys.forEach(async (key) => {
      Preferences.remove({ key: this.name + "_" + key });
    });
  }

  public async toObject() {
    let items: Record<string, any> = {};
    (await Preferences.keys()).keys.forEach(async (key) => {
      items[key] = await this.getItem(key);
    });
    return items;
  }
}

export function storageFromObject(name: string, object: any) {
  let storage = new Storage(name);
  for (const [key, value] of object) {
    storage.setItem(key, value);
  }
  return storage;
}

export const preferences = new Storage("preferences");
export const prs = new Storage("prs");

// Svelte Store
export const PRs = writable();
