<script>
    import LabeledInput from "$components/LabeledInput.svelte";
    import PercentageTable from "$components/PercentageTable.svelte";
</script>

<LabeledInput inputId="weight-calculator" label="Weight: ">
    <input id="weight-calculator" type="number" />
</LabeledInput>
<PercentageTable weight={0} />
