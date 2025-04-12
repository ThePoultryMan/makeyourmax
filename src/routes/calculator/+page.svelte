<script>
  import { onMount } from "svelte";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PercentageTable from "$components/PercentageTable/PercentageTable.svelte";

  let weight = $state(0);

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
