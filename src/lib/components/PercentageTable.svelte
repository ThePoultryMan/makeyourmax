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
  let customPercentage = 0;
  let barbellWeight: number;
  $: {
    preferences.setItem("defaultBarbellWeight", barbellWeight);
  }

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

  $: calculateWeights = (weight: number) => {
    let weightM = (weight - barbellWeight) / 2;
    let barbellWeights = [];
    while (weightM > 0) {
      for (const weightI of weights) {
        if (weightI <= weightM) {
          barbellWeights.push(weightI);
          weightM -= weightI;
          break;
        } else if (weightM < 2.5 && weightM > 0) {
          barbellWeights.push(weightM);
          weightM = 0;
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
      <tr class="[&>td]:last:border-b-0 odd:bg-background-900 bg-background-950">
        <td class="p-2 md:p-1 border-r border-b">
          <LabeledInput inputId="customPercent" label="%" flipped>
            <input id="customPercent" type="number" bind:value={customPercentage} class="w-16" />
          </LabeledInput>
        </td>
        <td class="p-2 md:p-1 border-b">
          <div class="flex justify-between items-center">
            <span>{Math.round((weight * (customPercentage / 100)) / round) * round}</span>
            <button on:click={() => toggleExplain("custom")}
              ><Icon
                icon="ion:barbell"
                class="mr-3 p-1 w-8 h-8 border border-accent-100 rounded-md"
              /></button
            >
          </div>
          <div id="customExplain" class="hidden w-fit ml-3 mb-1 p-2 bg-accent-400 rounded-lg">
            <span class="italic">Plates Required for a {barbellWeight}lbs. Bar:</span>
            <ul>
              {#each calculateWeights(Math.round((weight * (customPercentage / 100)) / round) * round) as plate}
                <li class="ml-1.5">- {plate}lbs.</li>
              {:else}
                <li class="ml-1.5">- Just The Bar</li>
              {/each}
            </ul>
          </div>
        </td>
      </tr>
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
                  ><Icon
                    icon="ion:barbell"
                    class="mr-3 p-1 w-8 h-8 border border-accent-100 rounded-md"
                  /></button
                >
              </div>
              <div
                id={(weightPercentages.length - i - 1) * 5 + "Explain"}
                class="hidden w-fit ml-3 mb-1 p-2 bg-accent-400 rounded-lg"
              >
                <span class="italic">
                  Plates Required for a 
                  <LabeledInput inputId={(weightPercentages.length - i - 1) * 5 + "Bar"} label="lbs." flipped>
                    <select id={(weightPercentages.length - i - 1) * 5 + "Bar"} bind:value={barbellWeight}>
                      <option value={45}>45</option>
                      <option value={35}>35</option>
                      <option value={25}>25</option>
                      <option value={15}>15</option>
                    </select>
                  </LabeledInput>
                  Bar:
                </span>
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
