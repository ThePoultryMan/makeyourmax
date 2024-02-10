<script lang="ts">
  import { onMount } from "svelte";

  import { weights } from "$lib/assets/weights.json";
  import PREFERENCES from "$lib/scripts/preferences";

  import LabeledInput from "$components/LabeledInput.svelte";

  export let targetWeight: number;
  export let percentage: number | string;
  let clazz: string = "";
  export { clazz as class };

  let barbellWeight: number;
  let barbellReady = false;
  $: {
    if (barbellReady) {
      PREFERENCES.setDefaultBarbellWeight(barbellWeight);
      PREFERENCES.save();
    }
  }

  onMount(async () => {
    const weight = PREFERENCES.getDefaultBarbellWeight();
    if (typeof weight === "string") {
      barbellWeight = parseInt(weight);
    } else {
      barbellWeight = weight;
    }
    barbellReady = true;
  });

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
  };
</script>

<div
  id={percentage + "Explain"}
  class={"hidden w-fit mb-1 p-2 text-xl bg-accent-400 rounded-lg " + clazz}
>
  <span class="italic">
    Plates Required for a
    <LabeledInput inputId={percentage + "Bar"} label="lbs." flipped>
      <select id={percentage + "Bar"} bind:value={barbellWeight}>
        <option value={45}>45</option>
        <option value={35}>35</option>
        <option value={25}>25</option>
        <option value={15}>15</option>
      </select>
    </LabeledInput>
    Bar:
  </span>
  <ul>
    {#each calculateWeights(targetWeight) as weight}
      <li class="ml-1.5">- {weight}lbs.</li>
    {:else}
      <li class="ml-1.5">- Just The Bar</li>
    {/each}
  </ul>
</div>
