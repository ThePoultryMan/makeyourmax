<script>
  import { onMount } from "svelte";

  import { preferences } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";
  import { browser } from "$app/environment";

  let weight = 0;
  $: {
    if (browser) {
      preferences.setItem("weightCalculator", weight);
    }
  }

  onMount(async () => {
    preferences.getItem("weightCalculator").then((value) => (weight = value));
  });
</script>

<svelte:head>
  <title>Make Your Max</title>
</svelte:head>

<div class="flex flex-col items-center [&>*]:my-3">
  <div>
    <LabeledInput inputId="weight-calculator" label="Weight: ">
      <input
        id="weight-calculator"
        type="number"
        bind:value={weight}
        on:focus={(event) => event.target.select()}
      />
    </LabeledInput>
  </div>
  <PercentageTable {weight} />
</div>
