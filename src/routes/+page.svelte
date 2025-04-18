<script lang="ts">
  import LabeledInput from "$components/LabeledInput.svelte";
  import { preferences, scores } from "$lib/scripts/stores.svelte";
  import type { AbstractScore } from "$lib/types";
  import { getScoreNumber } from "$lib/util";

  let creatingNewMovement = $state(false);
  let movementName = $state("");

  function createMovement() {
    scores.get().movements[movementName] = {
      name: movementName,
      scoreType: "Weight",
    };
    scores.get().scores[movementName] = {
      scores: [],
    };
    movementName = "";
    creatingNewMovement = false;
  }
</script>

<svelte:head>
  <title>Make Your Max - PRs</title>
</svelte:head>

<div class="flex flex-col items-center">
  <div class="flex flex-wrap justify-center gap-3 m-5 text-text-400 w-full">
    {#if scores.get()}
      {#each Object.entries(scores.get().scores) as [movement, scoreData]}
        <a
          href={"/m/" + movement}
          class="w-4/5 md:min-w-[264px] p-2 border-2 border-accent-700 rounded-lg"
        >
          <p class="text-lg font-semibold">{movement}</p>
          {#if preferences.get().showMaxOnPrPage}
            <p>
              1 Rep PR: {scoreData?.highest}
              {preferences.getWeightUnitsAbbreviation(
                scoreData?.highest ? getScoreNumber(scoreData.highest) > 1 : false
              )}
            </p>
          {/if}
        </a>
      {/each}
    {/if}
  </div>
  <button onclick={() => (creatingNewMovement = true)} class="mb-5 p-2 bg-accent-500 rounded-lg">
    Create New Movement
  </button>
</div>
{#if creatingNewMovement}
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg"
  >
    <div class="mb-2 text-lg">Create New Movement</div>
    <LabeledInput inputId="name" label="Name">
      <input id="name" type="text" bind:value={movementName} class="block" />
    </LabeledInput>
    <div class="flex gap-3 [&>button]:flex-1">
      <button
        onclick={() => (creatingNewMovement = false)}
        class="mt-3 p-2 border border-accent-500 rounded-lg">Close</button
      >
      <button onclick={createMovement} class="mt-3 p-2 bg-accent-500 rounded-lg">Create</button>
    </div>
  </div>
{/if}
