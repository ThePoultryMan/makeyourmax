<script lang="ts">
  export let inputId = "";
  export let label = "";
</script>

<div class="flex items-center text-lg">
  <label for={inputId} class="inline-block text-text-400 h-9 p-1 border rounded-l-lg border-accent-500">{label}</label>
  <div class="[&>*]:p-1 [&>*]:bg-background-400 [&>*]:rounded-r-lg">
    <slot />
  </div>
</div>
