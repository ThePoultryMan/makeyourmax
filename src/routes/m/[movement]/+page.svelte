<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  import { prs } from "$lib/indy";

  import PercentageTable from "$components/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";

  let max = 0;
  let maxes = [0, 0, 0, 0];
  let logOpen = false;

  onMount(async () => {
    prs.getItem($page.params.movement).then((value: any) => {
      if (value) {
        maxes = value;
      }
      max = 0;
    });
  });

  function openLogMenu(open: boolean) {
    logOpen = open;
  }

  function savePRs() {
    if (browser) {
      prs.setItem($page.params.movement, maxes);
      max = 0;
    }
  }

  function numToMax() {
    switch (max) {
      case 1:
        return "2";
      case 2:
        return "3";
      case 3:
        return "5";
      default:
        return "1";
    }
  }

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }
</script>

<svelte:head>
  <title>PRs - {toTitleCase($page.params.movement)}</title>
</svelte:head>

<div class="flex flex-col text-text-400 items-center">
  <h1 class="mt-8 mb-2 text-xl font-semibold">{toTitleCase($page.params.movement)}</h1>
  <h2 class="text-lg">{numToMax()} Rep Max: <span>{maxes[max] ? maxes[max] : "Not Set"}</span></h2>
  <div class="my-3">
    <button on:click={() => openLogMenu(true)} class="p-2 bg-accent-500 rounded-lg"
      >Log Score</button
    >
  </div>
  <PercentageTable weight={typeof maxes[max] !== "string" ? maxes[max] : 0} />
  {#if logOpen}
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg flex flex-col"
    >
      <h2 class="mb-1.5 text-center">Log Scores</h2>
      <div class="[&>*]:mb-2">
        <LabeledInput inputId="one-rep" label="1 Rep Max ">
          <input id="one-rep" type="number" bind:value={maxes[0]} size="5" class="appearance-none" />
        </LabeledInput>
        <LabeledInput inputId="two-rep" label="2 Rep Max ">
          <input id="two-rep" type="number" bind:value={maxes[1]} size="5" class="appearance-none" />
        </LabeledInput>
        <LabeledInput inputId="three-rep" label="3 Rep Max ">
          <input id="three-rep" type="number" bind:value={maxes[2]} size="5" class="appearance-none" />
        </LabeledInput>
        <LabeledInput inputId="five-rep" label="5 Rep Max ">
          <input id="five-rep" type="number" bind:value={maxes[3]} size="5" class="appearance-none" />
        </LabeledInput>
      </div>
      <button
        on:click={() => {
          savePRs();
          openLogMenu(false);
        }}
        class="p-1 px-2 bg-accent-500 rounded-lg"
      >
        Save
      </button>
    </div>
  {/if}
</div>
