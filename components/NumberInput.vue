<template>
  <input type="number" v-model="number" @keypress="event => checkNumberInput(event)" @focus="event => event.target.select()" class="w-28" />
</template>

<script setup lang="ts">
const { $setSaveData, $getSaveData } = useNuxtApp();

const props = defineProps({
  objectKeys: {
    default: undefined,
  },
  saveKey: {
    type: String,
    default: null,
  },
});
const emits = defineEmits<{
  valueChange: [value: number];
}>();

const number = ref(0);

onMounted(() => {
  if (props.objectKeys) {
    $getSaveData(props.objectKeys[0]).then((value: any) => {
      if (value) {
        number.value = value[props.objectKeys[1]];
      }
    })
  }
  if (props.saveKey) {
    $getSaveData(props.saveKey).then((value: any) => {
      if (value) {
        number.value = value;
      }
    });
  }
});

watch(number, (newNumber) => {
  emits("valueChange", newNumber);
  if (props.saveKey) $setSaveData(props.saveKey, newNumber);
});

function checkNumberInput(event: KeyboardEvent) {
  let valid = /[0-9]/i.test(event.key);
  return valid ? valid : event.preventDefault();
}
</script>
