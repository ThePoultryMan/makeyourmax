import { Preferences } from "@capacitor/preferences";
import { writable } from "svelte/store";

export class Storage {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public async fromObject(object: any) {
    this.clear();
    for (const [key, value] of Object.entries(object)) {
      await this.setItemJson(key, value);
    }
  }

  public async getItem<T>(key: string) {
    return (await Preferences.get({ key: this.name + "_" + key })).value;
  }

  public async setItem(key: string, value: any) {
    Preferences.set({
      key: this.name + "_" + key,
      value: value,
    });
  }

  public async removeItem(key: string) {
    Preferences.remove({ key: this.name + "_" + key });
  }

  public async getItemJson(key: string) {
    return JSON.parse((await this.getItem(key)) as string);
  }

  public async setItemJson(key: string, value: any) {
    this.setItem(key, JSON.stringify(value));
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
    for (const key of (await Preferences.keys()).keys) {
      if (key.startsWith(this.name + "_")) {
        items[key.replace(this.name + "_", "")] = await this.getItem(
          key.replace(this.name + "_", "")
        );
      }
    }
    return items;
  }
}

export function storageFromObject(name: string, object: any) {
  let storage = new Storage(name);
  for (const [key, value] of object) {
    storage.setItemJson(key, value);
  }
  return storage;
}

export const prs = new Storage("prs");

// Svelte Store
export const PRs = writable();
