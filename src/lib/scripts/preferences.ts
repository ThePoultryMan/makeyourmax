import { Storage } from "$lib/indy";

class Preferences {
  private options: PreferenceOptions = {
    defaultBarbellWeight: 45,
    theme: "myProd",
    lastNewsCheck: 0,
  };
  private storage = new Storage("preferences");

  public async save() {
    await this.storage.fromObject(this.options);
  }

  public async load() {
    for (const [key, value] of Object.entries(await this.storage.toObject() as PreferenceOptions)) {
      if (value) {
        this.options[key] = value;
      }
    }
  }

  public getDefaultBarbellWeight() {
    return this.options.defaultBarbellWeight;
  }

  public setDefaultBarbellWeight(weight: number) {
    if (typeof weight === "string") weight = parseInt(weight.replace("\\", ""));
    this.options.defaultBarbellWeight = weight;
  }

  public setTheme(theme: string) {
    this.options.theme = theme;
  }

  public getLastNewsCheck() {
    return this.options.lastNewsCheck;
  }

  public setLastNewsCheck(time: number) {
    this.options.lastNewsCheck = time;
  }
}

interface PreferenceOptions {
  defaultBarbellWeight: number;
  theme: string;
  lastNewsCheck: number;
}

const PREFERENCES = new Preferences();
export default PREFERENCES;
