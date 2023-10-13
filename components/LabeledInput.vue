<template>
  <div class="flex justify-center my-3">
    <label :for="props.inputId" class="inline-block h-9 p-1 border rounded-l-lg" :class="props.borderStyle ? props.borderStyle : 'border-accent-500'">{{ props.label }}</label>
    <div class="[&>*]:h-9 [&>*]:p-1 [&>*]:rounded-r-lg" :class="props.colorStyle ? props.colorStyle : '[&>*]:bg-accent-500'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
  borderStyle: {
    type: String,
  },
  colorStyle: {
    type: String,
  }
});
</script>
