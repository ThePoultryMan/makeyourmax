<template>
  <input type="number" :v-model="number" @input="event => number = parseInt(event.target.value)" @keypress="event => checkNumberInput(event)" />
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
      if (value) {
        number.value = value;
      }
    });
  }
});

function checkNumberInput(event: KeyboardEvent) {
  let valid = /[0-9]/i.test(event.key);
  return valid ? valid : event.preventDefault();
}
</script>
