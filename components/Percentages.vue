<template>
  <div>
    <ClientOnly>
      <table>
        <tr>
          <th>Percentage</th>
          <th>Weight</th>
        </tr>
        <tr v-for="weight, index in percentages">
          <td>{{ (index + 1) * 5 }}</td>
          <td>{{ weight }}</td>
        </tr>
      </table>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  ready: {
    type: Boolean,
    default: true,
  },
  weight: {
    required: true,
    type: Number,
  }
});

const percentages: Ref<Array<number>> = ref([]);

watch(() => props.ready, () => {
  for (let i = 5; i < 100; i += 5) {
    percentages.value.push(Math.round(props.weight * (i / 100)))
  }
});
</script>
