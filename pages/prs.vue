<template>
  <div>
    <header class="flex flex-col items-center my-16">
      <h1 class="text-lg">Personal Records</h1>
    </header>
    <div class="grid">
      <NuxtLink v-for="value, key in prs" :to="'/m/' + key">
        <div>
          <h2>{{ toTitle(key) }}</h2>
          <p>{{ value }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import movements from "~/assets/movements.json";

const { $getSaveData, $setSaveData } = useNuxtApp();

const prs = ref(await $getSaveData("prs"));

onMounted(() => {
  if (!prs.value) { prs.value = {}; }
  for (const movement of movements) {
    if (!(movement in prs.value)) {
      prs.value[movement] = null;
    }
  }
  $setSaveData("prs", toRaw(prs.value));
});

function toTitle(s: string) {
  return s.replace("/([A-Z])/g", " $1").replace("/^./", (str) => str.toUpperCase());
}
</script>
