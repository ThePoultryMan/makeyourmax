<template>
  <div class="mx-72 my-11">
    <form v-show="!calculated" @submit="calculate" @submit.prevent="onSubmit">
      <NumberInput :set-value="setWeight" />
    </form>
    <div v-show="calculated">
      <Percentages :ready="calculated" :weight="(weightInput)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const weightInput = ref(0);
const calculated = ref(false);

function calculate() {
  calculated.value = true;
}

function setWeight(weight: number) {
  weightInput.value = weight;
}
</script>
