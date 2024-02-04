<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  import { movements } from "$lib/assets/movements.json";
  import { PRs, prs } from "$lib/indy";
  
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";

  let max = 0;
  let maxes = [0, 0, 0, 0];
  let tempMaxes = maxes;
  let logOpen = false;
  let deleteStatus = 0;

  let allPRs: any = $PRs;

  onMount(async () => {
    prs.getItem($page.params.movement).then((value: any) => {
      if (value) {
        maxes = value;
        tempMaxes = maxes;
      }
      max = 0;
    });
  });

  function savePRs() {
    if (browser) {
      logOpen = false
      maxes = tempMaxes;
      prs.setItem($page.params.movement, maxes);
      allPRs[$page.params.movement] = maxes;
    }
  }

  function cancelPRChanges() {
    logOpen = false;
    tempMaxes = maxes;
  }

  function deleteMovement() {
    if (confirm("Are you sure you want to delete this movement? It will delete all data associated with the movement.")) {
      prs.removeItem($page.params.movement);
      goto("/");
    }
  }

  function numToMax(max: number) {
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

<div class="mb-3 p-1.5 text-lg bg-background-950">
  <a href="/" class="ml-2 font-semibold">Back</a>
</div>
<div class="flex flex-col text-text-400 items-center">
    <h1 class="mb-2 text-xl font-semibold">{toTitleCase($page.params.movement)}</h1>
    <h2 class="text-lg">{numToMax(max)} Rep Max: 
      <span>{maxes[max] ? maxes[max] : "Not Set"}</span>
    </h2>
    <div class="my-3">
      <button on:click={() => logOpen = true} class="p-2 bg-accent-500 rounded-lg"
        >Log Score</button
      >
    </div>
  <PercentageTable weight={typeof maxes[max] !== "string" ? maxes[max] : 0}>
    <LabeledInput inputId="max" label="Rep Max" flipped>
      <select id="max" bind:value={max}>
        <option value={0} selected>1</option>
        <option value={1} selected>2</option>
        <option value={2} selected>3</option>
        <option value={3} selected>5</option>
      </select>
    </LabeledInput>
  </PercentageTable>
  {#if !movements.includes($page.params.movement)}
    <button on:click={deleteMovement} class="my-5 p-2 text-slate-100 bg-primary-500 rounded-lg">{deleteStatus == 0 ? "Delete Movement" : "Are You Sure?"}</button>
  {:else}
    <p class="my-5"><i>This movement cannot be deleted.</i></p>
  {/if}
  {#if logOpen}
    <div
      id="log"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg flex flex-col"
    >
      <h2 class="mb-1.5 text-center">Log Scores</h2>
      <div class="[&>*]:mb-2">
        <LabeledInput inputId="one-rep" label="1 Rep Max ">
          <input id="one-rep" type="number" bind:value={tempMaxes[0]} size="5" class="w-full" />
        </LabeledInput>
        <LabeledInput inputId="two-rep" label="2 Rep Max ">
          <input id="two-rep" type="number" bind:value={tempMaxes[1]} size="5" class="w-full" />
        </LabeledInput>
        <LabeledInput inputId="three-rep" label="3 Rep Max ">
          <input id="three-rep" type="number" bind:value={tempMaxes[2]} size="5" class="w-full" />
        </LabeledInput>
        <LabeledInput inputId="five-rep" label="5 Rep Max ">
          <input id="five-rep" type="number" bind:value={tempMaxes[3]} size="5" class="w-full" />
        </LabeledInput>
      </div>
      <div class="flex gap-3">
        <button on:click={cancelPRChanges} class="w-full p-1 px-2 border border-accent-500 rounded-lg">
          Cancel
        </button>
        <button
          on:click={savePRs}
          class="w-full p-1 px-2 bg-accent-500 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Hack from https://browserstrangeness.bitbucket.io/css_hacks.html#safari 
     :global is used to force SvelteKit to keep the "unused" style.          */
  :global(_::-webkit-full-page-media, _:future, :root .webkit-fix) {
    appearance: none;
    width: 100%;
  }
</style>
