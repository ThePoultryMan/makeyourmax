<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";
  import { preferences, scores } from "$lib/scripts/stores.svelte";
  import type { AbstractScore, ScoreData, WeightScore } from "$lib/types";
  import { toAbbreviation } from "$lib/scripts/util";

  let scoreData: ScoreData = $derived(scores.getScoreData($page.params.movement));
  let tempScoreData: ScoreData = $state(scoreData);
  let currentScore: number = $state(0);
  let logOpen = $state(false);
  let deleteStatus = 0;

  onMount(async () => {
    const highestScore = scores.get().scores[$page.params.movement].highest;
    if (highestScore) {
      currentScore = scores.get().scores[$page.params.movement].scores.indexOf(highestScore);
    } else {
      currentScore = -1;
    }
  });

  function savePRs() {
    logOpen = false;
    // scoreData = tempScore;
    scores.setScore($page.params.movement, scoreData);
  }

  function cancelPRChanges() {
    logOpen = false;
    // tempScore = scoreData;
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

  function scoreLabel(score: AbstractScore) {
    if (scores.get().movements[$page.params.movement].scoreType === "Weight") {
      const weightScore = score as WeightScore;
      return `${weightScore.reps}${weightScore.sets ? "x" + weightScore.reps : ""} -`;
    }
  }

  function scoreDisplay(score: AbstractScore) {
    if (score.type === "Weight") {
      const weightScore = score as WeightScore;
      return `${weightScore.weight} ${toAbbreviation(preferences.get().weightUnits)}`;
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
  {#if currentScore >= 0}
    <LabeledInput inputId="score" label={scoreLabel(scoreData.scores[currentScore])}>
      <select id="score">
        {#each scoreData.scores as score}
          <option>{scoreDisplay(score)}</option>
        {/each}
      </select>
    </LabeledInput>
  {/if}
  <div class="my-3">
    <button onclick={() => (logOpen = true)} class="p-2 bg-accent-500 rounded-lg cursor-pointer"
      >All Scores</button
    >
  </div>
  {#if scores.get().movements[$page.params.movement].scoreType === "Weight"}
    <PercentageTable weight={(scoreData.scores[currentScore] as WeightScore).weight} />
  {/if}
  <button onclick={deleteMovement} class="my-5 p-2 text-slate-100 bg-primary-500 rounded-lg">
    {deleteStatus == 0 ? "Delete Movement" : "Are You Sure?"}
  </button>
</div>
{#if logOpen}
  <div
    id="log"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg flex flex-col"
  >
    <h2 class="mb-1.5 text-center">Scores</h2>
    <div class="*:mb-2">
      <button class="bg-accent-500 rounded-lg w-full">+</button>
      {#if scores.get().movements[$page.params.movement].scoreType === "Weight"}
        <!--TODO: Make borders rounded for last items-->
        <ul class="border border-accent-500 rounded-lg">
          {#each tempScoreData.scores as score}
            <li class="text-center">
              <div>[INSERT DATE HERE]</div>
              <div class="flex">
                <div class="flex-1 bg-accent-400">
                  <p class="text-xl">
                    {(score as WeightScore).reps}
                    {"Rep" + ((score as WeightScore).reps > 1 ? "s." : ".")}
                  </p>
                  <p></p>
                </div>
                {#if (score as WeightScore).sets}
                  <div class="flex-1 bg-accent-500">
                    <p class="text-xl">
                      {(score as WeightScore).sets}
                      {"Set" + ((score as WeightScore).sets > 1 ? "s." : ".")}
                    </p>
                  </div>
                {/if}
                <div class="flex-1 bg-accent-600">
                  <p class="text-xl">
                    {(score as WeightScore).weight}
                    {preferences.getWeightUnitsAbbreviation((score as WeightScore).weight > 1)}
                  </p>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="flex gap-3">
      <button onclick={cancelPRChanges} class="w-full p-1 px-2 border border-accent-500 rounded-lg">
        Cancel
      </button>
      <button onclick={savePRs} class="w-full p-1 px-2 bg-accent-500 rounded-lg"> Save </button>
    </div>
  </div>
{/if}

<style>
  /* Hack from https://browserstrangeness.bitbucket.io/css_hacks.html#safari 
     :global is used to force SvelteKit to keep the "unused" style.          */
  :global(_::-webkit-full-page-media, _:future, :root .webkit-fix) {
    appearance: none;
    width: 100%;
  }
</style>
