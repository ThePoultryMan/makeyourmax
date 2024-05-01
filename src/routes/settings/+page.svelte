<script lang="ts">
  import { onMount } from "svelte";

  import { Clipboard } from "@capacitor/clipboard";

  import { getAll, preferences, prs, importFromObject } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";
  import PopUp from "$components/PopUp.svelte";

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
  let copyStatus = 0;
  let copied = false;

  onMount(async () => {
    let dBW = await preferences.getItem<number>("defaultBarbellWeight");
    defaultBarbellWeight = dBW ? dBW : 45;

    // Backup
    fileObject = new File([JSON.stringify(await getAll(prs))], "prs.mymdata", {
      type: "application/json",
    });
    dataUrl = URL.createObjectURL(fileObject);

    fileReader.onload = () => {
      importFromObject(prs, JSON.parse(fileReader.result));
    };
  });

  function importBackup() {
    fileReader.readAsText(backupFile[0]);
    backupStatus = 2;
  }

  async function copyBackupCode() {
    if (copyStatus === 0) {
      if (copyStatus === 0) setTimeout(() => (copied = false), 5000);
      Clipboard.write({ string: await getBackupCode() }).catch(() => (copyStatus = 2));
      copied = true;
    }
  }

  async function getBackupCode() {
    let code = "";
    for (const key of await prs.keys()) {
      let data: any = await prs.getItem(key);
      if (!data) continue;
      code += key + `:${data[0]}:${data[1]}:${data[2]}:${data[3]};`;
    }
    return code + "{legacyCodeVersion:1};";
  }

  function manualCopy(event) {
    copyStatus = 2;
    event.target.select();
  }

  function windowFocus() {
    if (copyStatus === 2) {
      copyStatus = 1;
    }
  }
</script>

<svelte:body on:click={windowFocus} />

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
    <button
      on:click|stopPropagation={copyStatus === 0 ? copyBackupCode : manualCopy}
      
      class="p-2 bg-accent-500 rounded-lg"
    >
      {#if copyStatus <= 1}
        {copied ? "Copied" : "Copy Code"}
      {:else}
        {#await getBackupCode() then backupCode}
          <p class="select-all">{backupCode}</p>
        {/await}
      {/if}
    </button>
  </div>
</div>
