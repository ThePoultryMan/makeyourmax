<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  import { movements } from "$lib/assets/movements.json";

  import { prs } from "$lib/indy";

  let allPRs = {};

  onMount(() => {
    if (browser) {
      prs.getItem("prs").then((value) => {
        allPRs = value;
      });
    }
    for (const movement of movements) {
      if (!allPRs[movement]) {
        allPRs[movement] = "Not Set";
      }
    }

    prs.setItem("prs", allPRs);
  });

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }
</script>

<div class="flex flex-wrap justify-center gap-3">
  {#each Object.entries(allPRs) as [movement, max]}
    <a href={"/m/" + movement} class="min-w-[264px] p-2 border border-primary-500 rounded-lg">
      <h2>{toTitleCase(movement)}</h2>
      <p>{max}</p>
    </a>
  {/each}
</div>
