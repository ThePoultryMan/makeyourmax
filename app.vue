<template>
  <div class="text-text-400 max-h-screen overflow-hidden overscroll-none">
    <div v-if="ready">
      <VitePwaManifest />
      <div class="flex flex-col relative z-0">
        <Navigation @open-sidebar="showSidebar(true)" />
        <NuxtPage class="relative z-0" />
      </div>
      <Sidebar @hide-sidebar="showSidebar(false)" :activated="sidebar" class="absolute top-0 right-0 bg-accent-800 overflow-x-hidden h-screen" />
    </div>
    <div v-else class="bg-[#161221] min-h-screen flex justify-around items-center">
      <Icon id="loadSymbol" name="mingcute:loading-3-line" size="9rem" class="text-gray-200" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { key } from "localforage";
import themes from "~/assets/themes.json";

const { $setupSave, $getSaveData } = useNuxtApp();

const ready = ref(false);
const sidebar = ref(false);

let root: any;

useHead({
  bodyAttrs: {
    class: "bg-background-900",
  },
});

onBeforeMount(async () => {
  $setupSave();
  // Theming
  let themeName: String = await $getSaveData("theme") as String;
  if (!themeName) {
    themeName = "frightenedPurple";
  }

  root = document.querySelector(":root");
  if (root) {
    setThemeVariables(themes[themeName]);
  }
  ready.value = true;
});

function showSidebar(show: boolean) {
  sidebar.value = show;
}

function setThemeVariables(theme: any) {
  console.log(theme)
  for (const key of Object.keys(theme)) {
    for (const [property, text] of Object.entries(theme[key]))
    root.style.setProperty("--" + key + "-" + property, text);
  }
}
</script>

<style>
#loadSymbol {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
