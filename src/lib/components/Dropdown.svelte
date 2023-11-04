<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Icon from "@iconify/svelte";

  import { toTitleCase } from "$lib/util";

  let dispatch = createEventDispatcher();

  export let options: any[];
  export let currentOption: any;

  let open = false;

  let dropdownHeight = 0;
  $: {
    dropdownHeight = (options.length - 1) * 24;
  }

  function setSelected(option: string) {
    currentOption = option;
    dispatch("select", option);
  }
</script>

<button on:click={() => open = !open} class="p-2 bg-accent-600 rounded-lg w-full" style="--dropdown-height: {dropdownHeight}px">
  <div class="flex justify-between items-center">
    <div>{toTitleCase(currentOption)}</div>
    <div class:rotate-0={open} class:rotate-180={!open} class="dropdown-arrow">
      <Icon icon="iconamoon:arrow-up-2-fill" />
    </div>
  </div>
  <div class:max-h-0={!open} class:dropdown-open={open} class="dropdown overflow-hidden">
    {#each options.filter((value) => value !== currentOption) as option}
      <button on:click={() => setSelected(option)} class="w-full text-left">{toTitleCase(option)}</button>
    {/each}
  </div>
</button>

<style>
  .dropdown {
    transition: max-height 0.1s ease-in-out;
  }

  .dropdown-open {
    max-height: var(--dropdown-height);
  }

  .dropdown-arrow {
    transition: transform 0.1s ease-in-out;
  }
</style>
