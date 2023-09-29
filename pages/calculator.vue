<template>
  <div class="flex flex-col items-center my-11">
    <form @submit="calculate" @submit.prevent="onSubmit">
      <NumberInput :set-value="setWeight" class="m-1 bg-background-900" />
      <div>
        <label for="round">Round To </label>
        <select v-bind="round" name="round" class="m-1 bg-background-900">
          <option :value="5">Five</option>
        </select>
      </div>
    </form>
    <div v-show="calculated">
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
