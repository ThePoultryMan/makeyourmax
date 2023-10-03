<template>
  <div class="flex flex-col items-center overflow-y-scroll">
    <header class="w-full mb-3 mt-7">
      <h1 class="text-center text-xl font-bold">Weight Calculator</h1>
      <hr class="mt-2 mx-[25%]" />
    </header>
    <div class="w-full flex flex-col items-center">
      <LabeledInput input-id="weight" label="Weight ">
        <NumberInput id="weight" save-key="calcWeight" @value-change="setWeight" />
      </LabeledInput>
      <div class="flex gap-3">
        <LabeledInput input-id="percentIter" label="Every ">
          <select v-model="percentIter" id="percentIter">
            <option :value="10">10%</option>
            <option :value="5">5%</option>
            <option :value="2.5">2.5%</option>
          </select>
        </LabeledInput>
        <LabeledInput input-id="round" label="Round To ">
          <select v-model="round" id="round">
            <option :value="5">Five</option>
          </select>
        </LabeledInput>
      </div>
      <div v-show="calculated" class="w-2/3 m-1 max-h-[60vh] overflow-y-scroll border border-separate border-spacing-0 border-accent-100 rounded-lg">
        <Percentages :ready="calculated" :round="round" :percent-iter="percentIter" :weight="(weightInput)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $setSaveData, $getSaveData } = useNuxtApp();

const weightInput = ref(0);
const calculated = ref(false);
const round = ref(5);
const percentIter = ref(5);

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
