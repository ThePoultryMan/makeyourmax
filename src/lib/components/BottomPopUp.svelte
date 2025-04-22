<script lang="ts">
  import type { Snippet } from "svelte";
    import { fade } from "svelte/transition";

  interface Props {
    top: string;
    active: boolean;
    children?: Snippet;
  }

  let { top, active, children } = $props();
</script>

{#if active}
  <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-55" transition:fade={{ duration: 100 }} ></div>
{/if}
<div
  class="absolute bottom-0 left-0 z-10 w-full px-5 py-3 bg-background-950 transition-[top] duration-100 rounded-t-4xl"
  style:top={active ? top : "100%"}
>
  {@render children?.()}
</div>
