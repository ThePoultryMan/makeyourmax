<script lang="ts">
  import { onMount } from "svelte";

  import { getAll, prs } from "$lib/indy";

  let dataUrl = "";
  let file: any;

  onMount(async () => {
    file = new File([JSON.stringify(await getAll(prs))], "prs.mymdata", {
      type: "application/json",
    });
    dataUrl = URL.createObjectURL(file);
  });
</script>

<div class="mt-5 ml-8">
  <h1 class="mb-3 text-xl font-semibold">Settings</h1>
  <h2 class="mb-1 text-lg">Backup</h2>
  <div>
    {#if file}
      <a href={dataUrl} download={file.name} class="mr-2 p-2 bg-accent-500 rounded-lg"
        >Download Data</a
      >
    {/if}
    <button class="p-2 bg-accent-500 rounded-lg">Import Data</button>
  </div>
</div>
