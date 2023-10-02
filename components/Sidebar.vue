<template>
  <div class="absolute top-0 right-0 bg-accent-800 overflow-x-hidden z-10">
    <Transition name="sidebar">
      <div v-show="props.activated" id="sidebar" class="h-screen">
        <button @click="emits('hide-sidebar')" class="text-lg absolute top-0 right-0 m-3">&times;</button>
        <nav class="ml-12 mt-24 flex flex-col text-2xl gap-3">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/prs">PRs</NuxtLink>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  activated: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits([ "hide-sidebar" ]);
</script>

<style>
:root {
  --sidebar-width: 100vw;
}
@media (min-width: 1024px) {
  :root {
    --sidebar-width: 33.333333vw;
  }
}

#sidebar {
  width: var(--sidebar-width);
}

.sidebar-enter-active {
  animation: sidebar 0.5s;
}
.sidebar-leave-active {
  animation: sidebar 0.5s reverse;
}

@keyframes sidebar {
  0% {
    width: 0px;
  }
  100% {
    width: var(--sidebar-width);
  }
}
</style>
