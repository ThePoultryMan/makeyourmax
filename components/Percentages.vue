<template>
  <div
    class="m-1 max-h-[60vh] overflow-y-scroll border border-accent-100 rounded-lg"
  >
    <table class="w-full border-separate border-spacing-0">
      <thead class="sticky top-0">
        <tr>
          <th class="p-1 border-r border-b border-accent-100 bg-accent-600">
            Percentage
          </th>
          <th class="p-1 border-b border-accent-100 bg-accent-600">Weight</th>
        </tr>
      </thead>
      <tr
        v-for="(weight, index) in percentages"
        class="[&>td]:last:border-b-0 [&>td]:odd:bg-background-900 [&>td]:bg-background-950"
      >
        <td class="p-2 md:p-1 border-r border-b border-accent-100 z-0">
          {{ (percentages.length - index) * props.percentIter }}%
        </td>
        <td class="p-2 md:p-1 border-b border-accent-100 z-0">{{ weight }}</td>
      </tr>
    </table>
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
  percentIter: {
    type: Number,
    default: 5,
  },
  weight: {
    required: true,
    type: Number,
  },
});

const percentages: Ref<Array<number>> = ref([]);

watch(
  () => props.ready,
  () => {
    calculate();
  }
);
watch(
  () => props.round,
  () => {
    calculate();
  }
);
watch(
  () => props.percentIter,
  () => {
    calculate();
  }
);
watch(
  () => props.weight,
  () => {
    calculate();
  }
);

onMounted(() => {
  if (props.ready) {
    calculate();
  }
});

function calculate() {
  percentages.value.length = 0;
  for (let i = props.percentIter; i < 100; i += props.percentIter) {
    let weight = Math.round(props.weight * (i / 100));
    if (props.round == 5) {
      weight = $roundToFive(weight);
    }
    percentages.value.push(weight);
  }
  percentages.value = percentages.value.reverse();
}
</script>
