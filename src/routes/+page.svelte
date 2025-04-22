<script lang="ts">
  import BottomPopUp from "$components/BottomPopUp.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";
  import { preferences, scores } from "$lib/scripts/stores.svelte";
  import { getScoreNumber } from "$lib/util";
  import Icon from "@iconify/svelte";

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
          <!--TODO: Introduce a system for setting default/display pr-->
          {#if preferences.get().showMaxOnPrPage}
            <p>
              1 Rep PR: {scoreData?.highest}
              {preferences.getWeightUnitsAbbreviation(
                scoreData?.highest ? getScoreNumber(scoreData.highest) > 1 : false
              )}
            </p>
          {/if}
        </a>
      {:else}
        <p class="mt-7 mx-10 text-center">
          You haven't added any movements or scores. Click "+" to add a new movement.
        </p>
      {/each}
    {/if}
  </div>
  <button
    onclick={() => (creatingNewMovement = true)}
    class="absolute bottom-3 right-3 mb-[78px] bg-accent-500 rounded-lg"
  >
    <Icon icon="material-symbols-light:add-2-rounded" class="w-12 h-12" />
  </button>
</div>
<BottomPopUp top="60%" active={creatingNewMovement}>
  <h2 class="mb-1 text-2xl font-semibold text-center">Add New Movement</h2>
  <hr class="mb-3" />
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
</BottomPopUp>
