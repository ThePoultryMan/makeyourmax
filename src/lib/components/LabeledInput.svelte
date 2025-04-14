<script lang="ts">
  import "$lib/styles/labledinput.css";

  interface Props {
    inputId?: string;
    label?: string;
    flipped?: boolean;
    children?: import("svelte").Snippet;
  }

  let { inputId = "", label = "", flipped = false, children }: Props = $props();
</script>

<div
  class="inline-flex items-stretch w-full text-text-400 text-lg"
  class:flex-row-reverse={flipped}
>
  <label
    for={inputId}
    class="inline-block h-fit flex-1 p-1 pr-2 border border-accent-500"
    class:rounded-l-lg={!flipped}
    class:rounded-r-lg={flipped}>{label}</label
  >
  <div
    class="flex w-fit items-center *:h-9 *:p-1 *:bg-accent-500 bg-accent-500"
    class:rounded-not-flipped={!flipped}
    class:rounded-flipped={flipped}
  >
    {@render children?.()}
  </div>
</div>
