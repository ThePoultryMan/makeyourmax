<script>
  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable.svelte";

  let weight = 0;
</script>

<div class="flex flex-col items-center [&>*]:my-3">
  <LabeledInput inputId="weight-calculator" label="Weight: ">
    <input id="weight-calculator" type="number" bind:value={weight} />
  </LabeledInput>
  <PercentageTable {weight} />
</div>
