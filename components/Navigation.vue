<template>
  <div class="p-3 bg-background-950">
    <div class="w-full flex items-center gap-3 justify-between text-lg">
      <span class="font-semibold"><NuxtLink to="/">Max & Maxer</NuxtLink></span>
      <button @click="emits('openSidebar')" class="text-2xl">&plus;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits([ "openSidebar" ]);
</script>
