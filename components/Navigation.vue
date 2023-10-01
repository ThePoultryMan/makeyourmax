<template>
  <div class="p-3 flex justify-between bg-background-950">
    <div class="w-full flex gap-3 justify-between text-lg">
      <span class="font-semibold"><NuxtLink to="/">Max & Maxer</NuxtLink></span>
      <button @click="emits('openSidebar')">&plus;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits([ "openSidebar" ]);
</script>
