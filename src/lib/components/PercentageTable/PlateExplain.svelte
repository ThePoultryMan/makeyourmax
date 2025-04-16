<script lang="ts">
  import { preferences } from "$lib/scripts/stores.svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
  import { toAbbreviation } from "$lib/scripts/util";
  import { invoke } from "@tauri-apps/api/core";

  interface Props {
    targetWeight: number;
    percentage: number | string;
    class?: string;
  }

  let { targetWeight, percentage, class: clazz = "" }: Props = $props();

  let barbellWeight: number = $state(preferences.get().defaultBarbellWeight);
  let lastPlates: number[] = $state([]);

  const calculatePlates = $derived((weight: number) => {
    const plates = invoke("calculate_plates", {
      weight: weight,
      barbellWeight: barbellWeight,
    }) as Promise<number[]>;
    plates.then((value) => {
      lastPlates = value;
    })
    return plates;
  });
</script>

<div
  id={percentage + "Explain"}
  class={"hidden w-fit mb-1 p-2 text-xl bg-accent-400 rounded-lg " + clazz}
>
  <span class="italic">
    Plates Required for a
    <LabeledInput
      inputId={percentage + "Bar"}
      label={preferences.getWeightUnitsAbbreviation()}
      flipped
    >
      <select id="barbellWeightDefault" bind:value={barbellWeight}>
        {#if preferences.get().weightUnits === "Pounds"}
          <option value={45}>45</option>
          <option value={35}>35</option>
          <option value={25}>25</option>
          <option value={15}>15</option>
        {:else}
          <option value={20}>20</option>
          <option value={15}>15</option>
        {/if}
      </select>
    </LabeledInput>
    Bar:
  </span>
  <ul>
    {#await calculatePlates(targetWeight)}
      {#each lastPlates as weight}
        <li class="ml-1.5">- {weight + preferences.getWeightUnitsAbbreviation()}</li>
      {:else}
        <li class="ml-1.5">- Just The Bar</li>
      {/each}
    {:then plates}
      {#each plates as weight}
        <li class="ml-1.5">- {weight + preferences.getWeightUnitsAbbreviation()}</li>
      {:else}
        <li class="ml-1.5">- Just The Bar</li>
      {/each}
    {/await}
  </ul>
</div>
