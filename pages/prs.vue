<template>
  <div>
    <header class="flex flex-col items-center my-16">
      <h1 class="text-lg">Personal Records</h1>
    </header>
    <div v-show="!movement" class="grid">
      <div v-for="value, key in prs" @click="movement = key">
        <h2>{{ toTitle(key) }}</h2>
        <p>{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import movements from "~/assets/movements.json";

const { $getSaveData, $setSaveData } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const prs = ref(await $getSaveData("prs"));
const movement = ref(route.query.m ? route.query.m : "");

onMounted(() => {
  if (!prs.value) { prs.value = {}; }
  for (const movement of movements) {
    if (!(movement in prs.value)) {
      prs.value[movement] = null;
    }
  }
  $setSaveData("prs", toRaw(prs.value));
});

watch(movement, (newMovement) => {
  router.push({
    query: { m: newMovement },
  });
});

function toTitle(s: string) {
  return s.replace("/([A-Z])/g", " $1").replace("/^./", (str) => str.toUpperCase());
}
</script>
