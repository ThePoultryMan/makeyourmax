<template>
  <div class="text-text-400 max-h-screen overflow-hidden overscroll-none">
    <VitePwaManifest />
    <div class="flex flex-col relative z-0">
      <Navigation @open-sidebar="showSidebar(true)" />
      <NuxtPage class="relative z-0" />
    </div>
    <Sidebar @hide-sidebar="showSidebar(false)" :activated="sidebar" class="absolute top-0 right-0 bg-accent-800 overflow-x-hidden h-screen" />
  </div>
</template>

<script setup lang="ts">
const { $setupSave } = useNuxtApp();

const sidebar = ref(false);

useHead({
  bodyAttrs: {
    class: "bg-background-900",
  },
});

onBeforeMount(() => {
  $setupSave();
});

function showSidebar(show: boolean) {
  sidebar.value = show;
}
</script>
