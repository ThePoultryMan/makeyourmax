<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  import { prs } from "$lib/indy";

  import PercentageTable from "$components/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";

  let weight = 0;
  let maxes = [0];
  $: {
    if (browser) {
      prData[$page.params.movement] = maxes;
      prs.setItem("prs", prData);
      weight = maxes[0];
    }
  }
  let prData: any = {};
  let logOpen = false;

  onMount(async () => {
    prs.getItem("prs").then((value: any) => {
      if (value && value[$page.params.movement]) {
        maxes = value[$page.params.movement];
        weight = value[$page.params.movement][0];
        prData = value;
      }
    });
  });

  function openLogMenu() {
    logOpen = true;
  }

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }
</script>

<svelte:head>
  <title>PRs - {toTitleCase($page.params.movement)}</title>
</svelte:head>

<div class="flex flex-col text-text-400 items-center">
  <h1 class="my-8 text-xl font-semibold">{toTitleCase($page.params.movement)}</h1>
  <div class="my-3">
    <!-- <LabeledInput inputId="max" label="Max: ">
      <input id="max" type="number" bind:value={weight} on:focus={event => event.target.select()} />
    </LabeledInput> -->
    <button on:click={openLogMenu} class="p-2 bg-accent-500 rounded-lg">Log Score</button>
  </div>
  <PercentageTable weight={typeof weight !== "string" ? weight : 0} />
  {#if logOpen}
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-background-800 rounded-lg">
      <h2 class="mb-1.5">Log Scores:</h2>
      <LabeledInput inputId="one-rep" label="1 Rep Max: ">
        <input id="one-rep" type="number" bind:value={maxes[0]} />
      </LabeledInput>
      <LabeledInput inputId="two-rep" label="2 Rep Max: ">
        <input id="two-rep" type="number" bind:value={maxes[1]} />
      </LabeledInput>
      <LabeledInput inputId="three-rep" label="3 Rep Max: ">
        <input id="three-rep" type="number" bind:value={maxes[2]} />
      </LabeledInput>
      <LabeledInput inputId="five-rep" label="5 Rep Max: ">
        <input id="five-rep" type="number" bind:value={maxes[3]} />
      </LabeledInput>
    </div>
  {/if}
</div>
