<script>
  import { onMount } from "svelte";

  import { preferences } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";

  let weight = $state(0);
  $effect(() => {
    preferences.setItem("weightCalculator", weight);
  });

  onMount(async () => {
    preferences.getItem("weightCalculator").then((value) => (weight = value));
  });
</script>

<svelte:head>
  <title>Make Your Max</title>
</svelte:head>

<div class="flex flex-col items-center *:my-3">
  <div>
    <LabeledInput inputId="weight-calculator" label="Weight: ">
      <input
        id="weight-calculator"
        type="number"
        bind:value={weight}
        onfocus={(event) => event.target.select()}
      />
    </LabeledInput>
  </div>
  <PercentageTable {weight} />
</div>
