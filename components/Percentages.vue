<template>
  <div>
    <ClientOnly>
      <table class="w-full text-center border border-separate border-spacing-0 border-accent-100 rounded-lg">
        <tr class="border-accent-100">
          <th class="p-1 border-r border-b border-accent-100">Percentage</th>
          <th class="p-1 border-b border-accent-100">Weight</th>
        </tr>
        <tr v-for="weight, index in percentages" class="[&>td]:last:border-b-0">
          <td class="p-1 border-b last:border-b-0 border-r border-accent-100">{{ (percentages.length - index) * 5 }}%</td>
          <td class="p-1 border-b border-accent-100">{{ weight }}</td>
        </tr>
      </table>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { $roundToFive } = useNuxtApp();

const props = defineProps({
  ready: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Number,
    default: 5,
  },
  weight: {
    required: true,
    type: Number,
  }
});

const percentages: Ref<Array<number>> = ref([]);

watch(() => props.ready, () => {
  calculate();
});
watch(() => props.round, () => {
  calculate();
});
watch(() => props.weight, () => {
  calculate();
});

function calculate() {
  percentages.value.length = 0;
  for (let i = 5; i < 100; i += 5) {
    let weight = Math.round(props.weight * (i / 100));
    if (props.round == 5) {
      weight = $roundToFive(weight);
    } 
    percentages.value.push(weight);
  }
  percentages.value = percentages.value.reverse();
}
</script>
