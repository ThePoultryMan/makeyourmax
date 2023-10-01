<template>
  <input type="number" :v-model="number" @input="event => number = parseInt(event.target.value)" />
</template>

<script setup lang="ts">
const { $setSaveData, $getSaveData } = useNuxtApp();

const props = defineProps({
  saveKey: {
    type: String,
    default: null,
  },
});
const emits = defineEmits<{
  valueChange: [value: number];
}>();

let number = ref(0);

watch(number, (newNumber) => {
  emits("valueChange", newNumber);
  if (props.saveKey) $setSaveData(props.saveKey, newNumber);
})

onMounted(() => {
  if (props.saveKey) {
    $getSaveData(props.saveKey).then((value: any) => {
      if (value) number.value = value;
    });
  }
});
</script>
