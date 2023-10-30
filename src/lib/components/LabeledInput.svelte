<script lang="ts">
  export let inputId = "";
  export let label = "";
</script>

<div class="flex items-center text-text-400 text-lg">
  <label for={inputId} class="inline-block h-9 p-1 border rounded-l-lg border-accent-500">{label}</label>
  <div class="[&>*]:h-9 [&>*]:p-1 [&>*]:bg-accent-500 [&>*]:rounded-r-lg">
    <slot />
  </div>
</div>
