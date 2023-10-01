<template>
  <div class="flex justify-center my-3">
    <label :for="props.inputId" class="inline-block h-9 p-1 border border-accent-500 rounded-l-lg">{{ props.label }}</label>
    <div class="[&>*]:h-9 [&>*]:p-1 [&>*]:bg-accent-500 [&>*]:rounded-r-lg">
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
});
</script>
