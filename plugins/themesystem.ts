import themes from "~/assets/themes.json";

export default defineNuxtPlugin(() => {
  const { $getSaveData, $setSaveData } = useNuxtApp();
  const themeOptions = [];
  for (const [key, value] of Object.entries(themes)) {
    themeOptions.push([key, value.meta.name]);
  };

  return {
    provide: {
      setupTheming: async () => {
        let themeName: String = await $getSaveData("theme") as String;
        if (!themeName) {
          themeName = "myProd";
        }

        let root = document.querySelector(":root");
        if (root) {
          for (const key of Object.keys(themes[themeName])) {
            for (const [property, text] of Object.entries(themes[themeName][key])) {
              root.style.setProperty("--" + key + "-" + property, text);
            }
          }
        }
        return true;
      },
      saveThemeChoice: (theme: string) => {
        $setSaveData("theme", theme);
      },
      updateTheme: (theme: string) => {
        let root = document.querySelector(":root");
        if (root) {
          for (const key of Object.keys(themes[theme])) {
            for (const [property, text] of Object.entries(themes[theme][key])) {
              root.style.setProperty("--" + key + "-" + property, text);
            }
          }
        }
      },
      getThemes: () => {
        return themeOptions;
      },
      getNameFromValue: (value: string) => {
        return themes[value].meta.name;
      },
    },
  };
});
