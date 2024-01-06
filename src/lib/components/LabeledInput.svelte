<script lang="ts">
  import "$lib/styles/labledinput.css";

  export let inputId = "";
  export let label = "";
  export let flipped = false;
</script>

<div class="flex items-center text-text-400 text-lg" class:flex-row-reverse={flipped}>
  <label
    for={inputId}
    class="inline-block w-full h-9 p-1 pr-2 border border-accent-500"
    class:rounded-l-lg={!flipped}
    class:rounded-r-lg={flipped}>{label}</label
  >
  <div
    class="[&>*]:h-9 [&>*]:p-1 [&>*]:bg-accent-500"
    class:rounded-not-flipped={!flipped}
    class:rounded-flipped={flipped}
  >
    <slot />
  </div>
</div>
