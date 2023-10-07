<template>
  <div>
    <div @click="open = !open">{{ props.valueDisplay ? props.valueDisplay : props.value }}</div>
    <div v-show="open" class="">
      <div v-for="choice in otherChoices" @click="select(choice)">{{ choice[1] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    required: true,
  },
  valueSetter: {
    type: Function,
    required: true,
  },
  valueDisplay: {
    type: String,
  },
  choices: {
    type: Array,
    required: true,
  },
});

const open = ref(false);
const otherChoices = computed(() => {
  return props.choices.filter((val) => JSON.stringify([val[0], val[1]]) != JSON.stringify([props.value, props.valueDisplay]));
});

function select(choice: any) {
  props.valueSetter(choice[0]);
  open.value = false;
}
</script>
