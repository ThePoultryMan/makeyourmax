<template>
  <div class="text-text-500">
    <VitePwaManifest />
    <Navigation />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { $setupSave } = useNuxtApp();

useHead({
  bodyAttrs: {
    class: "bg-background-900",
  },
});

onBeforeMount(() => {
  $setupSave();
});
</script>
