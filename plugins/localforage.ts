import localforage from "localforage";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      setup: () => {
        localforage.config({
          name: "maxer",
        });
      },
      saveData: (key: string, value: any) => {
        localforage.setItem(key, value);
      },
      getData: (key: string) => {
        return localforage.getItem(key);
      },
    },
  };
});

