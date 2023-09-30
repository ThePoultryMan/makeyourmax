<template>
  <nav class="p-3 flex justify-between bg-background-950">
    <div class="w-full flex gap-3 justify-between">
      <span><NuxtLink to="/">Max & Maxer</NuxtLink></span>
      <button @click="$pwa.install()">&plus;</button>
    </div>
  </nav>
</template>
