<script lang="ts">
  import Icon from "@iconify/svelte";

  import { weights } from "$lib/assets/weights.json";
  import { preferences } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";
    import { onMount } from "svelte";

  export let weight = 0;

  let round = 5;
  let weightPercentages: number[] = [];
  $: {
    weightPercentages = [];
    for (let i = 100; i >= 0; i -= 5) {
      let percent = weight * (i / 100);
      weightPercentages.push(Math.round(percent / round) * round);
    }
  }
  let barbellWeight: number;

  onMount(async () => {
    const weight = await preferences.getItem<number>("defaultBarbellWeight");
    barbellWeight = weight ? weight : 45;
  });

  function toggleExplain(percentage: string) {
    let explain = document.getElementById(percentage + "Explain");
    if (explain?.classList.contains("hidden")) {
      explain.classList.remove("hidden");
    } else {
      explain?.classList.add("hidden");
    }
  }

  function calculateWeights(weight: number) {
    let weightM = (weight - barbellWeight) / 2;
    let barbellWeights = [];
    while (weightM > 0) {
      for (const weightI of weights) {
        if (weightI <= weightM) {
          barbellWeights.push(weightI);
          weightM -= weightI;
          break;
        }
      }
    }
    return barbellWeights;
  }
</script>

<div class="w-full flex flex-col items-center">
  <div class="flex gap-3 mb-5">
    <LabeledInput inputId="round" label="Round To">
      <select id="round" bind:value={round}>
        <option value={2.5}>2.5</option>
        <option value={5} selected>5</option>
        <option value={10} selected>10</option>
      </select>
    </LabeledInput>
    <slot />
  </div>
  <div
    class="w-5/6 md:w-2/3 max-h-[60vh] text-2xl md:text-lg text-text-400 border border-accent-100 rounded-lg overflow-y-scroll"
  >
    <table class="w-full border-separate border-spacing-0 table-fixed">
      <thead class="sticky top-0">
        <tr>
          <th class="bg-accent-600 border-r border-b">Percentage</th>
          <th class="bg-accent-600 border-b">Weight</th>
        </tr>
      </thead>
      {#each weightPercentages as value, i}
        {#if i !== 0 && i !== weightPercentages.length - 1}
          <tr class="[&>td]:last:border-b-0 odd:bg-background-900 bg-background-950">
            <td class="p-2 md:p-1 border-r border-b">{(weightPercentages.length - i - 1) * 5}%</td>
            <td class="p-2 md:p-1 border-b">
              <div class="flex justify-between items-center">
                <span>{value}</span>
                <button
                  on:click={() =>
                    toggleExplain(((weightPercentages.length - i - 1) * 5).toString())}
                  ><Icon icon="ion:barbell" class="mr-3 text-xl" /></button
                >
              </div>
              <div
                id={(weightPercentages.length - i - 1) * 5 + "Explain"}
                class="hidden ml-3 w-fit"
              >
                <span class="italic">Plates Required for a 45lbs. Bar:</span>
                <ul>
                  {#each calculateWeights(value) as weight}
                    <li class="ml-1.5">- {weight}lbs.</li>
                  {:else}
                    <li class="ml-1.5">- Just The Bar</li>
                  {/each}
                </ul>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </table>
  </div>
</div>
