<template>
  <div>
    <header class="flex flex-col items-center my-16">
      <h1 class="text-lg">Personal Records</h1>
    </header>
    <div class="flex flex-col items-center">
      <h2>{{ toTitle(route.params.movement) }}</h2>
      <LabeledInput label="Max" input-id="max-input">
        <NumberInput
          @value-change="(weight) => saveMax(weight)"
          :object-keys="['prs', route.params.movement]"
        />
      </LabeledInput>
      <Percentages
        v-show="prs[route.params.movement]"
        :weight="typeof prs[route.params.movement] === 'number' ? prs[route.params.movement] : 0"
        class="w-5/6 md:w-2/3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $getSaveData, $setSaveData } = useNuxtApp();
const route = useRoute();

let prs = ref(await $getSaveData("prs"));

watch(prs.value, (newPrs) => {
  $setSaveData("prs", toRaw(newPrs));
});

function saveMax(weight: number) {
  prs.value[route.params.movement] = weight;
}

function toTitle(s: string) {
  return s
    .replace(/([A-Z])/g, " $1")
    .replace(/^./g, (str) => str.toUpperCase());
}
</script>
