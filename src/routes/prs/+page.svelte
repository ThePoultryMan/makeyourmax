<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  import { movements } from "$lib/assets/movements.json";

  import { prs } from "$lib/indy";

  let allPRs: any = {};
  $: {
    for (const [movement, pr] of Object.entries(allPRs)) {
      prs.setItem(movement, pr);
    }
  }

  onMount(async () => {
    if (browser) {
      await prs.getItem("prs").then(() => {
        prs.removeItem("prs");
      });
    }
    for (const movement of movements) {
      prs.getItem(movement).then((value) => {
        if (value) {
          allPRs[movement] = value;
        } else {
          allPRs[movement] = ["Not Set", "Not Set", "Not Set", "Not Set"];
        }
      });
    }
  });

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }
</script>

<svelte:head>
  <title>Make Your Max - PRs</title>
</svelte:head>

<div class="flex flex-wrap justify-center gap-3 m-5 text-text-400">
  {#each Object.entries(allPRs) as [movement, max]}
    <a href={"/m/" + movement} class="min-w-[264px] p-2 border border-primary-500 rounded-lg">
      <h2>{toTitleCase(movement)}</h2>
      <p>{max === "Not Set" ? max : max[0]}</p>
    </a>
  {/each}
</div>
