<template>
  <div class="text-text-500">
    <VitePwaManifest />
    <Navigation @open-sidebar="showSidebar(true)" />
    <Sidebar @hide-sidebar="showSidebar(false)" :activated="sidebar" />
    <NuxtPage />
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
