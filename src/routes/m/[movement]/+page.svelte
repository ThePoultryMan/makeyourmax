<script lang="ts">
  import type { AbstractScore, DatedEntries, WeightScore } from "$lib/types";

  import TabBar from "$components/TabBar.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";

  import { page } from "$app/state";

  import { invoke } from "@tauri-apps/api/core";

  import { preferences, scores } from "$lib/scripts/stores.svelte";
  import { toAbbreviation } from "$lib/scripts/util";
  import Icon from "@iconify/svelte";
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";
  import BottomPopUp from "$components/BottomPopUp.svelte";

  let currentTab = $state(0);
  const sortedScores = $derived.by(() => {
    if (scores.isBackendSynced()) {
      return invoke("sort_scores_by_date", { movement: page.params.movement }) as Promise<
        DatedEntries<AbstractScore>[]
      >;
    } else {
      return [];
    }
  });
  let newScoreInfo = $state(getDefaultNewScore());
  let selectedScore: AbstractScore | undefined = $state();

  let addingScore = $state(false);

  function addNewScore() {
    scores.setScore(page.params.movement, {
      type: "Weight",
      reps: newScoreInfo.reps ? newScoreInfo.reps : 0,
      weight: newScoreInfo.weight ? newScoreInfo.weight : 0,
      date: newScoreInfo.date,
    } as WeightScore);
    newScoreInfo = getDefaultNewScore();
    addingScore = false;
  }

  async function selectScore(dateIndex: number, scoreIndex: number) {
    currentTab = 1;
    selectedScore = (await sortedScores)[dateIndex].entries[scoreIndex];
  }

  function scoreLabel(score: AbstractScore) {
    if (scores.get().movements[page.params.movement].scoreType === "Weight") {
      const weightScore = score as WeightScore;
      return `${weightScore.reps} rep${weightScore.reps > 1 ? "s." : "."}`;
    }
  }

  function scoreDisplay(score: AbstractScore) {
    if (score.type === "Weight") {
      const weightScore = score as WeightScore;
      return `${weightScore.weight} ${toAbbreviation(preferences.get().weightUnits)}`;
    }
  }

  function getDefaultNewScore() {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    return {
      reps: undefined,
      weight: undefined,
      date: currentDate,
    };
  }
</script>

<svelte:head>
  <title>PRs - {page.params.movement}</title>
</svelte:head>

<h1 class="mb-1 text-2xl font-semibold text-center">{page.params.movement}</h1>
<hr class="mx-5" />
<TabBar
  tabs={["Scores", "Percentages"]}
  initialWidth={77}
  bind:currentTab
  clickable={currentTab === 1}
/>
{#if currentTab === 0}
  <div class="flex flex-col mx-5">
    <button
      class="w-full mb-4 text-2xl bg-accent-500 rounded-lg"
      onclick={() => (addingScore = true)}
    >
      +
    </button>
    {#await sortedScores then sortedScores}
      {#if sortedScores.length > 0}
        {#each sortedScores as entry, dateIndex}
          <ul class="border-2 rounded-lg border-accent-700">
            <li class="border-accent-700 text-center">
              <div class="text-lg border-accent-700">{entry.date}</div>
              {#each entry.entries as score, scoreIndex}
                <div
                  class="flex text-2xl border-t-2 border-accent-700 *:py-1 last:*:first:rounded-bl-[5px] last:*:last:rounded-br-[5px]"
                >
                  <span class="flex-1 bg-accent-500">{scoreLabel(score)}</span>
                  <button
                    onclick={() => selectScore(dateIndex, scoreIndex)}
                    class="flex justify-between items-center flex-1 bg-accent-600"
                  >
                    <span class="ml-5">{scoreDisplay(score)}</span>
                    <Icon
                      icon="material-symbols:arrow-forward-ios-rounded"
                      class="inline w-6 h-6 mr-1"
                    />
                  </button>
                </div>
              {/each}
            </li>
          </ul>
        {/each}
      {:else}
        <div class="mt-1 text-center">
          <p>No scores yet.</p>
          <p>Click "+" to add a new score.</p>
        </div>
      {/if}
    {/await}
  </div>

  <BottomPopUp top="35%" active={addingScore}>
    <h2 class="mb-1 text-2xl font-semibold text-center">Add Score</h2>
    <hr class="mb-3" />
    <div class="*:mb-3">
      <LabeledInput inputId="reps" label="Reps">
        <input id="reps" type="number" bind:value={newScoreInfo.reps} />
      </LabeledInput>
      <LabeledInput inputId="weight" label="Weight">
        <input id="weight" type="number" bind:value={newScoreInfo.weight} />
      </LabeledInput>
      <LabeledInput inputId="date" label="Date">
        <input id="date" type="date" bind:value={newScoreInfo.date} />
      </LabeledInput>
      <div class="flex gap-3 mt-7">
        <button
          onclick={() => (addingScore = false)}
          class="flex-1 p-1.5 text-center border border-accent-500 rounded-lg"
        >
          Cancel
        </button>
        <button onclick={addNewScore} class="flex-1 p-1.5 text-center bg-accent-500 rounded-lg">
          Save
        </button>
      </div>
    </div>
  </BottomPopUp>
{:else if selectedScore}
  {#if selectedScore.type === "Weight"}
    <div class="mb-4 text-2xl text-center">
      {scoreLabel(selectedScore)}
      {scoreDisplay(selectedScore)}
    </div>
    <PercentageTable weight={(selectedScore as WeightScore).weight} />
  {:else}
    <p>Score is invalid.</p>
  {/if}
{:else}
  <p>No score selected.</p>
{/if}
