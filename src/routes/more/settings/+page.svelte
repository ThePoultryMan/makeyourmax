<script lang="ts">
  import { preferences } from "$lib/scripts/stores.svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
  import type { BarbellWeight, WeightUnit } from "$lib/types";
  import { toAbbreviation } from "$lib/scripts/util";
  import Toggle from "$components/Toggle.svelte";

  let barbellWeight: BarbellWeight = $state(preferences.get().defaultBarbellWeight);
  $effect(() => {
    if (barbellWeight) {
      preferences.setDefaultBarbellWeight(barbellWeight);
    }
  });
  let weightUnits: WeightUnit = $state(preferences.get().weightUnits);

  function onWeightUnitsChange() {
    preferences.get().weightUnits = weightUnits;
    if (weightUnits === "Kilograms") {
      barbellWeight = barbellWeight <= 35 ? 15 : 20;
    } else {
      barbellWeight = barbellWeight === 15 ? 35 : 45;
    }
  }
  $inspect(preferences.get());
</script>

<div class="mt-5 mx-8">
  <h1 class="mb-1.5 text-2xl font-semibold">Settings</h1>
  <hr class="mb-3" />
  <h2 class="mb-1 text-xl">Preferences</h2>
  <LabeledInput inputId="show-scores" label="Show 1 Rep. Max on PRs Page">
    <Toggle
      id="show-scores"
      bind:value={
        () => preferences.get().showMaxOnPrPage,
        (show) => (preferences.get().showMaxOnPrPage = show)
      }
    />
  </LabeledInput>
  <h2 class="mb-1 text-xl">Scores</h2>
  <LabeledInput inputId="barbellWeightDefault" label="Default Barbell Weight" class="mb-3">
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
  <LabeledInput inputId="weightUnits" label="Units (Weight)">
    <select id="weightUnits" bind:value={weightUnits} onchange={onWeightUnitsChange}>
      <option value="Pounds">Pounds (lbs.)</option>
      <option value="Kilograms">Kilograms (kg)</option>
    </select>
  </LabeledInput>
</div>
