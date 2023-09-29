<template>
  <div class="text-text-500">
    <Navigation />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: "bg-background-900"
    }
  })
</script>
