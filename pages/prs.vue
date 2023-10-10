<template>
  <div>
    <header class="flex flex-col items-center my-16">
      <h1 class="text-lg">Personal Records</h1>
    </header>
    <div v-show="!movement" class="mx-5 flex flex-wrap gap-3 justify-center">
      <div
        v-for="(value, key) in filteredPrs"
        @click="movement = key"
        class="p-2 border border-primary-500 rounded-lg cursor-pointer"
      >
        <h2>{{ toTitle(key) }}</h2>
        <p>{{ value }}</p>
      </div>
    </div>
    <div
      v-show="movement && movements.includes(movement)"
      class="flex flex-col items-center"
    >
      <h2>{{ toTitle(movement) }}</h2>
      <LabeledInput label="Max" input-id="max-input">
        <NumberInput
          @value-change="(weight) => saveMax(weight)"
          :object-keys="['prs', movement]"
        />
      </LabeledInput>
      <Percentages
        v-show="prs[movement]"
        :weight="prs[movement]"
        class="w-5/6 md:w-2/3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import movements from "~/assets/movements.json";

const { $getSaveData, $setSaveData } = useNuxtApp();
const route = useRoute();
const router = useRouter();

let prs = ref(await $getSaveData("prs"));
const filteredPrs = computed(() => {
  Object.keys(prs.value).forEach(key => {
    if (!prs.value[key]) {
      delete prs.value[key];
    }
  });
  return prs.value;
});
const movement = ref(route.query.m ? route.query.m : "");

onMounted(() => {
  if (!prs.value) {
    prs.value = {};
  }
  for (const movementI of movements) {
    if (!(movementI in prs.value)) {
      prs.value[movementI] = "Not Set";
    }
  }
  $setSaveData("prs", toRaw(prs.value));
});

watch(prs.value, (newPrs) => {
  $setSaveData("prs", toRaw(newPrs));
});
watch(movement, (newMovement) => {
  router.push({
    query: { m: newMovement },
  });
});

function saveMax(weight: number) {
  prs.value[movement.value] = weight;
}

function toTitle(s: string) {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./g, (str) => str.toUpperCase());
}
</script>
