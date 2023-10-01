<template>
  <div class="flex flex-col items-center my-11">
    <header class="w-full mb-3">
      <h1 class="text-center text-xl font-bold">Weight Calculator</h1>
      <hr class="mt-2 mx-[25%]" />
    </header>
    <LabeledInput input-id="weight" label="Weight: ">
      <NumberInput id="weight" save-key="calcWeight" @value-change="setWeight" />
    </LabeledInput>
    <LabeledInput input-id="round" label="Round To: ">
      <select v-bind="round" id="round">
        <option :value="5">Five</option>
      </select>
    </LabeledInput>
    <div v-show="calculated" class="w-2/3 m-1">
      <Percentages :ready="calculated" :round="round" :weight="(weightInput)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $setSaveData, $getSaveData } = useNuxtApp();

const weightInput = ref(0);
const calculated = ref(false);
const round = ref(5);

onMounted(() => {
  $getSaveData("calcWeight").then((weight: any) => {
    weightInput.value = weight;
  });
  calculate();
});

function calculate() {
  calculated.value = true;
}

function setWeight(weight: number) {
  weightInput.value = weight;
  $setSaveData("calcWeight", weight);
}
</script>
