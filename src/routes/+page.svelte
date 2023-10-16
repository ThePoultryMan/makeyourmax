<script>
  import { onMount } from "svelte";

  import { preferences } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable.svelte";
    import { browser } from "$app/environment";

  let weight = 0;
  $: {
    if (browser) {
      preferences.setItem("weightCalculator", weight);
    }
  }

  onMount(async () => {
    preferences.getItem("weightCalculator").then((value) => weight = value);
  });
</script>

<div class="flex flex-col items-center [&>*]:my-3">
  <LabeledInput inputId="weight-calculator" label="Weight: ">
    <input id="weight-calculator" type="number" bind:value={weight} />
  </LabeledInput>
  <PercentageTable {weight} />
</div>
