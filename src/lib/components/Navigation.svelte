<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import brandThemes from "$lib/assets/brandthemes.json";

  import cf3k4 from "$lib/assets/images/logos/CF30004logo.png";

  function getLogo(logo: string): string {
    switch (logo) {
      case "cf3k4":
        return cf3k4
      default:
        return "";
    };
  }

  export let brand: string | null = "";
  export let alt: string | null = "";
</script>

<div class="p-3 bg-background-950 text-text-400">
  <div class="w-full flex items-center gap-3 justify-between text-lg">
    {#if !brand}
      <a href="/" class="font-semibold">Make Your Max</a>
    {:else}
      <a href="/"><img src={getLogo(brand)} {alt} class="h-14" /></a>
    {/if}
    <button on:click={() => dispatch("sidebar-open", true)} class="text-2xl">&plus;</button>
  </div>
</div>
