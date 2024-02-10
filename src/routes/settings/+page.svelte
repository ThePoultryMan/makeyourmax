<script lang="ts">
  import { onMount } from "svelte";

  import { preferences, prs } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";

  const fileReader = new FileReader();

  // Preferences
  let defaultBarbellWeight: number;
  $: {
    preferences.setItem("defaultBarbellWeight", defaultBarbellWeight);
  }

  // Backup
  let dataUrl = "";
  let fileObject: any;
  let backupFile: any;
  let backupStatus = 0;

  onMount(async () => {
    let dBW = await preferences.getItem<number>("defaultBarbellWeight");
    defaultBarbellWeight = dBW ? dBW : 45;

    // Backup
    fileObject = new File([JSON.stringify(await prs.toObject())], "prs.mymdata", {
      type: "application/json",
    });
    dataUrl = URL.createObjectURL(fileObject);

    fileReader.onload = () => {
      prs.fromObject(JSON.parse(fileReader.result));
    };
  });

  function importBackup() {
    fileReader.readAsText(backupFile[0]);
    backupStatus = 2;
  }
</script>

<div class="mt-5 ml-8">
  <h1 class="mb-3 text-xl font-semibold">Settings</h1>
  <h2 class="mb-1 text-lg">Preferences</h2>
  <div class="flex">
    <LabeledInput inputId="barbellWeightDefault" label="Default Barbell Weight">
      <select id="barbellWeightDefault" bind:value={defaultBarbellWeight}>
        <option value={45}>45lbs.</option>
        <option value={35}>35lbs.</option>
        <option value={25}>25lbs.</option>
        <option value={15}>15lbs.</option>
      </select>
    </LabeledInput>
  </div>
  <h2 class="mb-1 text-lg">Backup</h2>
  <div class="flex flex-wrap gap-2 items-start">
    {#if fileObject}
      <a href={dataUrl} download={fileObject.name} class="p-2 bg-accent-500 rounded-lg"
        >Download Data</a
      >
    {:else}
      <div class="p-2 bg-accent-500 rounded-lg">Download Data</div>
    {/if}
    <div class="p-2 bg-accent-500 rounded-lg w-min">
      <div>
        <label for="backupImport" class="block mb-1 cursor-pointer">Import Backup</label>
        <input
          id="backupImport"
          type="file"
          on:change={() => (backupStatus = 1)}
          bind:files={backupFile}
          accept=".mymdata"
          class="w-72"
        />
      </div>
      {#if backupStatus == 1}
        <p class="my-2">
          <b>WARNING:</b> Completing this action will overwrite your currently saved PRs.
        </p>
        <button on:click={importBackup} class="p-2 bg-accent-400 rounded-lg">Confirm Import</button>
      {:else if backupStatus == 2}
        <p class="my-2">Imported Data!</p>
      {/if}
    </div>
  </div>
</div>
