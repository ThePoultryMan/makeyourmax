<template>
  <div class="relative p-2 rounded-lg bg-accent-600 transition-w">
    <div @click="open = !open">{{ props.valueDisplay ? props.valueDisplay : props.value }}</div>
    <Transition name="dropdown">
      <div v-show="open" class="dropdown overflow-hidden">
        <div v-for="choice in otherChoices" @click="select(choice)">{{ choice[1] }}</div>
      </div>
    </Transition>
    <Icon name="material-symbols:arrow-back-ios-new-rounded" class="absolute top-0 right-0 m-3 -rotate-90" />
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

<style>
.dropdown-enter-active {
  animation: dropdown 0.1s linear;
}

.dropdown-leave-active {
  animation: dropdown 0.1s linear reverse;
}

@keyframes dropdown {
  from {
    max-height: 0px;
  }
  to {
    max-height: 24px;
  }
}
</style>
