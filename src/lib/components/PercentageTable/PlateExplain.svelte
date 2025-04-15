<script lang="ts">
  import { onMount } from "svelte";

  import { weights } from "$lib/assets/weights.json";
  import { preferences } from "$lib/scripts/stores.svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
    import { toAbbreviation } from "$lib/scripts/util";

  interface Props {
    targetWeight: number;
    percentage: number | string;
    class?: string;
  }

  let { targetWeight, percentage, class: clazz = "" }: Props = $props();

  let barbellWeight: number = $state(preferences.get().defaultBarbellWeight);

  let calculateWeights = $derived((weight: number) => {
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
  });
</script>

<div
  id={percentage + "Explain"}
  class={"hidden w-fit mb-1 p-2 text-xl bg-accent-400 rounded-lg " + clazz}
>
  <span class="italic">
    Plates Required for a
    <LabeledInput inputId={percentage + "Bar"} label={preferences.getWeightUnitsAbbreviation()} flipped>
      <select id="barbellWeightDefault" bind:value={barbellWeight}>
        {#if preferences.get().weightUnits === "Pounds"}
          <option value={45}>45{toAbbreviation("Pounds")}</option>
          <option value={35}>35{toAbbreviation("Pounds")}</option>
          <option value={25}>25{toAbbreviation("Pounds")}</option>
          <option value={15}>15{toAbbreviation("Pounds")}</option>
        {:else}
          <option value={20}>20{toAbbreviation("Kilograms")}</option>
          <option value={15}>15{toAbbreviation("Kilograms")}</option>
        {/if}
      </select>
    </LabeledInput>
    Bar:
  </span>
  <ul>
    {#each calculateWeights(targetWeight) as weight}
      <li class="ml-1.5">- {weight + preferences.getWeightUnitsAbbreviation()}</li>
    {:else}
      <li class="ml-1.5">- Just The Bar</li>
    {/each}
  </ul>
</div>
