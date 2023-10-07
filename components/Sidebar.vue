<template>
  <div class="absolute top-0 right-0 bg-accent-800">
    <Transition name="sidebar">
      <div v-show="props.activated" id="sidebar" class="h-screen">
        <button @click="emits('hide-sidebar')" class="text-lg absolute top-0 right-0 m-3">&times;</button>
        <nav class="px-12 py-24 text-2xl">
          <div v-for="contents in pages" class="flex flex-col gap-3 mb-3">
            <hr v-if="contents.sep" class="mt-7" />
            <NuxtLink v-for="name, page in filterContents(contents)" :to="'/' + page" @click="emits('hide-sidebar')">{{ name }}</NuxtLink>
          </div>
        </nav>
        <Dropdown :value="theme" :value-setter="setTheme" :value-display="themeName" :choices="themes" class="mx-12" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { $updateTheme, $getThemes, $getNameFromValue } = useNuxtApp();

const props = defineProps({
  activated: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits([ "hide-sidebar" ]);

const pages = {
  setOne: {
    sep: false,
    "": "Home",
    prs: "PRs",
  },
  setTwo: {
    sep: true,
    roadmap: "Roadmap",
  },
};

const theme = ref("frightenedPurple");
const themes = ref($getThemes());
const themeName = computed(() => $getNameFromValue(theme.value));

function filterContents(contents: object) {
  let filteredContents = structuredClone(contents);
  delete filteredContents.sep;
  return filteredContents;
}

function setTheme(newTheme: string) {
  theme.value = newTheme;
  $updateTheme(theme.value);
}
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
