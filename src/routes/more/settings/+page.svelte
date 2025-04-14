<script lang="ts">
  import { onMount } from "svelte";

  import { preferences } from "$lib/scripts/stores.svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
  import type { BarbellWeight } from "$lib/types";

  let barbellWeight: BarbellWeight | undefined = $state();
  $effect(() => {
    if (barbellWeight) {
      preferences.setDefaultBarbellWeight(barbellWeight);
    }
  });

  onMount(async () => {
    barbellWeight = preferences.get().defaultBarbellWeight;
  });

  $inspect(preferences.get());
</script>

<div class="mt-5 mx-8">
  <h1 class="mb-1.5 text-2xl font-semibold">Settings</h1>
  <hr class="mb-3" />
  <h2 class="mb-1 text-xl">Preferences</h2>
  <div>
    <LabeledInput inputId="barbellWeightDefault" label="Default Barbell Weight">
      {#if barbellWeight}
        <select id="barbellWeightDefault" bind:value={barbellWeight}>
          <option value={45}>45lbs.</option>
          <option value={35}>35lbs.</option>
          <option value={25}>25lbs.</option>
          <option value={15}>15lbs.</option>
        </select>
      {/if}
    </LabeledInput>
  </div>
</div>
