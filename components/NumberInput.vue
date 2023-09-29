<template>
  <input type="number" :value="number" @input="event => props.setValue(parseInt(event.target.value))" class="appearance-none" />
</template>

<script setup lang="ts">
const props = defineProps({
  setValue: {
    type: Function,
    required: true,
  },
});

let number = ref(0);
</script>
