<template>
  <div>
    <header class="flex flex-col items-center my-16">
      <h1 class="text-lg">Personal Records</h1>
    </header>
    <div class="mx-5 flex flex-wrap gap-3 justify-center">
      <NuxtLink
        v-for="(value, key) in filteredPrs"
        :to="'/m/' + key"
        class="p-2 border border-primary-500 rounded-lg cursor-pointer min-w-[264px]"
      >
        <h2>{{ toTitle(key) }}</h2>
        <p>{{ value }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import movements from "~/assets/movements.json";

const { $getSaveData, $setSaveData } = useNuxtApp();

let prs = ref(await $getSaveData("prs"));
const filteredPrs = computed(() => {
  Object.keys(prs.value).forEach((key) => {
    if (!prs.value[key]) {
      delete prs.value[key];
    }
  });
  return prs.value;
});

onMounted(() => {
  if (!prs.value) {
    prs.value = {};
  }
  for (const movementI of movements.movements) {
    if (!(movementI in prs.value)) {
      prs.value[movementI] = "Not Set";
    }
  }
  $setSaveData("prs", toRaw(prs.value));
});

watch(prs.value, (newPrs) => {
  $setSaveData("prs", toRaw(newPrs));
});

function toTitle(s: string) {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./g, (str) => str.toUpperCase());
}
</script>
