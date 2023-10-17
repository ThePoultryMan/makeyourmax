<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  import { prs } from "$lib/indy";

  import PercentageTable from "$components/PercentageTable.svelte";
  import LabeledInput from "$components/LabeledInput.svelte";

  let weight = 0;
  $: {
    if (browser) {
      prData[$page.params.movement] = weight;
      prs.setItem("prs", prData);
    }
  }
  let prData: any = {};

  onMount(async () => {
    prs.getItem("prs").then((value: any) => {
      if (value && value[$page.params.movement]) {
        weight = value[$page.params.movement];
        prData = value;
      }
    });
  });

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }
</script>

<div class="flex flex-col text-text-400 items-center">
  <h1 class="my-8 text-xl font-semibold">{toTitleCase($page.params.movement)}</h1>
  <div class="my-3">
    <LabeledInput inputId="max" label="Max: ">
      <input id="max" type="number" bind:value={weight} on:focus={event => event.target.select()} />
    </LabeledInput>
  </div>
  <PercentageTable weight={typeof weight !== "string" ? weight : 0} />
</div>
