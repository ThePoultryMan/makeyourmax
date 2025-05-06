<script lang="ts">
  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";

  let weight = $state(0);
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
      />
    </LabeledInput>
  </div>
  <PercentageTable {weight} />
</div>
