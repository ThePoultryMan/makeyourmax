<script>
    import LabeledInput from "$components/LabeledInput.svelte";
    import PercentageTable from "$components/PercentageTable.svelte";

    let weight = 0;
</script>

<LabeledInput inputId="weight-calculator" label="Weight: ">
    <input id="weight-calculator" type="number" bind:value={weight} />
</LabeledInput>
<PercentageTable weight={weight} />
