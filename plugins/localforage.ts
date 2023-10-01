import localforage from "localforage";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      setupSave: () => {
        localforage.config({
          name: "maxer",
        });
      },
      setSaveData: (key: string, value: any) => {
        localforage.setItem(key, value);
      },
      getSaveData: (key: string) => {
        return localforage.getItem(key);
      },
    },
  };
});

