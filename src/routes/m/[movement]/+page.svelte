<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";
  import { scores } from "$lib/scripts/stores.svelte";
  import type { Score } from "$lib/types";

  let score: Score = $state({
    score: 0,
    scoreType: "Weight",
  });
  let tempScore: Score = $state(score);
  let logOpen = $state(false);
  let deleteStatus = 0;

  onMount(async () => {
    score = scores.getScore($page.params.movement);
  });

  function savePRs() {
    logOpen = false;
    score = tempScore;
    scores.setScore($page.params.movement, score);
  }

  function cancelPRChanges() {
    logOpen = false;
    tempScore = score;
  }

  function deleteMovement() {
    if (
      confirm(
        "Are you sure you want to delete this movement? It will delete all data associated with the movement."
      )
    ) {
      scores.removeScore($page.params.movement);
      goto("/");
    }
  }
</script>

<svelte:head>
  <title>PRs - {$page.params.movement}</title>
</svelte:head>

<div class="mb-3 p-1.5 text-lg bg-background-950">
  <a href="/" class="ml-2 font-semibold">Back</a>
</div>
<div class="flex flex-col text-text-400 items-center">
  <h1 class="mb-2 text-xl font-semibold">{$page.params.movement}</h1>
  <h2 class="text-lg">
    1 Rep Max:
    <span>{score ? score.score : "Not Set"}</span>
  </h2>
  <div class="my-3">
    <button onclick={() => (logOpen = true)} class="p-2 bg-accent-500 rounded-lg">Log Score</button>
  </div>
  <PercentageTable weight={typeof score !== "string" ? score?.score : 0} />
  <button onclick={deleteMovement} class="my-5 p-2 text-slate-100 bg-primary-500 rounded-lg">
    {deleteStatus == 0 ? "Delete Movement" : "Are You Sure?"}
  </button>
  {#if logOpen}
    <div
      id="log"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg flex flex-col"
    >
      <h2 class="mb-1.5 text-center">Log Scores</h2>
      <div class="*:mb-2">
        <LabeledInput inputId="one-rep" label="1 Rep Max ">
          <input id="one-rep" type="number" bind:value={tempScore.score} size="5" class="w-full" />
        </LabeledInput>
      </div>
      <div class="flex gap-3">
        <button
          onclick={cancelPRChanges}
          class="w-full p-1 px-2 border border-accent-500 rounded-lg"
        >
          Cancel
        </button>
        <button onclick={savePRs} class="w-full p-1 px-2 bg-accent-500 rounded-lg"> Save </button>
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
