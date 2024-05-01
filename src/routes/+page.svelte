<script lang="ts">
  import { PRs, prs } from "$lib/indy";
  import LabeledInput from "$components/LabeledInput.svelte";

  let allPRs: any = $PRs;
  $: {
    for (const [movement, pr] of Object.entries(allPRs)) {
      prs.setItem(movement, pr);
      allPRs[movement] = pr;
    }
  }
  let creatingNewMovement = false;
  let movementName = "";

  function createMovement() {
    console.log(fromTitleCase(movementName));
    allPRs[fromTitleCase(movementName)] = ["Not Set", "Not Set", "Not Set", "Not Set"];
    movementName = "";
    creatingNewMovement = false;
  }

  function toTitleCase(text: string) {
    return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
  }

  function fromTitleCase(text: string) {
    return text.replaceAll(" ", "").replace(/^./g, (str) => str.toLowerCase());
  }
</script>

<svelte:head>
  <title>Make Your Max - PRs</title>
</svelte:head>

<div class="flex flex-col items-center">
  <div class="flex flex-wrap justify-center gap-3 m-5 text-text-400">
    {#each Object.entries(allPRs) as [movement, max]}
      <a
        href={"/m/" + movement}
        class="w-4/5 md:min-w-[264px] p-2 border-2 border-accent-700 rounded-lg"
      >
        <p class="text-lg font-semibold">{toTitleCase(movement)}</p>
        {#await max then max}
          <p>{max ? max : "Not Set"}</p>
        {/await}
      </a>
    {/each}
  </div>
  <button on:click={() => (creatingNewMovement = true)} class="mb-5 p-2 bg-accent-500 rounded-lg"
    >Create New Movement</button
  >
</div>
{#if creatingNewMovement}
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-1/3 p-3 bg-background-800 rounded-lg"
  >
    <div class="mb-2 text-lg">Create New Movement</div>
    <LabeledInput inputId="name" label="Name">
      <input id="name" type="text" bind:value={movementName} class="block" />
    </LabeledInput>
    <div class="flex gap-3 [&>button]:flex-1">
      <button
        on:click={() => (creatingNewMovement = false)}
        class="mt-3 p-2 border border-accent-500 rounded-lg">Close</button
      >
      <button on:click={createMovement} class="mt-3 p-2 bg-accent-500 rounded-lg">Create</button>
    </div>
  </div>
{/if}
