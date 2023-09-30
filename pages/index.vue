<template>
  <div class="flex flex-col items-center my-11">
    <form @submit="calculate" @submit.prevent="onSubmit">
      <NumberInput :set-value="setWeight" class="m-1 bg-accent-500 p-1.5 rounded-lg" />
      <div class="flex justify-center my-3">
        <label for="round" class="inline-block h-9 p-1 border border-accent-500 rounded-l-lg">Round To </label>
        <select v-bind="round" name="round" class="h-9 p-1 bg-accent-500 rounded-r-lg">
          <option :value="5">Five</option>
        </select>
      </div>
    </form>
    <div v-show="calculated" class="w-2/3 m-1">
      <Percentages :ready="calculated" :round="round" :weight="(weightInput)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import nuxtStorage from "nuxt-storage";

const weightInput = ref(0);
const calculated = ref(false);
const round = ref(5);

onMounted(() => {
  weightInput.value = nuxtStorage.localStorage.getData("maxerCalcWeight");
  calculate();
});

function calculate() {
  calculated.value = true;
}

function setWeight(weight: number) {
  weightInput.value = weight;
  nuxtStorage.localStorage.setData("maxerCalcWeight", weightInput.value, 60);
}
</script>
