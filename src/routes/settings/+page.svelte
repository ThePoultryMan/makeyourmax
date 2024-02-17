<script lang="ts">
  import { onMount } from "svelte";

  import PREFERENCES from "$lib/scripts/preferences";
  import { prs, PRs } from "$lib/indy";

  import LabeledInput from "$components/LabeledInput.svelte";

  const fileReader = new FileReader();

  // Preferences
  let defaultBarbellWeight: number;
  let barbellReady = false;
  $: {
    if (barbellReady) {
      PREFERENCES.setDefaultBarbellWeight(defaultBarbellWeight);
      PREFERENCES.save();
    }
  }

  // Backup
  let dataUrl = "";
  let fileObject: any;
  let backupFile: any;
  let backupStatus = 0;
  let copied = false;
  let codeBackupStatus = 0;
  let backupCode = "";

  onMount(async () => {
    const weight = PREFERENCES.getDefaultBarbellWeight();
    if (typeof weight === "string") {
      defaultBarbellWeight = parseInt(weight);
    } else {
      defaultBarbellWeight = weight;
    }
    barbellReady = true;

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

  async function copyBackupCode() {
    let code = "";
    for (const key of await prs.getKeys()) {
      let data: any = await prs.getItemJson(key);
      if (!data) continue;
      code += key;
      for (let i = 0; i < 4; i++) {
        code += ":" + (data[i] === "Not Set" ? "NS" : data[i]);
      }
      code += ";";
    }
    navigator.clipboard.writeText(code + "{legacyCodeVersion:1};");
    copied = true;
    setTimeout(() => (copied = false), 5000);
  }

  async function importWithBackupCode() {
    if (
      !backupCode.endsWith("{legacyCodeVersion:1};") &&
      !backupCode.endsWith("{legacyCodeVersion:1}")
    ) {
      codeBackupStatus = -1;
      setTimeout(() => (codeBackupStatus = 0), 1500);
      return;
    }
    const items = backupCode.split(";");
    const parsedData: Record<string, any[]> = {};

    for (const item of items) {
      const sections = item.split(":");
      const prArray = [];
      for (let i = 1; i < 5; i++) {
        if (!sections[0] || sections[0] === "{legacyCodeVersion") continue;
        let parsedPr = parseInt(sections[i]);
        prArray.push(parsedPr ? parsedPr : "Not Set");
      }
      
      if (prArray.length > 0) {
        parsedData[sections[0]] = prArray;
      }
    }

    // Wait to clear until after parsing. Preventing invalid data to be passed.
    await prs.clear();
    for (const [key, value] of Object.entries(parsedData)) {
      await prs.setItemJson(key, value);
    }
    PRs.set(await prs.toObjectJson());

    codeBackupStatus = 2;
    setTimeout(() => (codeBackupStatus = 0), 1500);
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
    <button on:click={copyBackupCode} class="p-2 bg-accent-500 rounded-lg"
      >{copied ? "Copied" : "Copy Code"}</button
    >
    <div class="[&>*]:p-2 bg-accent-500 rounded-lg">
      {#if codeBackupStatus === 0}
        <button on:click={() => (codeBackupStatus = 1)} class="bg-accent-500 rounded-lg"
          >Import From Code</button
        >
      {:else if codeBackupStatus === 1}
        <div>
          <label for="codeInput">Paste Backup Code</label>
          <input id="codeInput" type="text" bind:value={backupCode} />
          <button on:click={importWithBackupCode}>Import</button>
        </div>
      {:else if codeBackupStatus === 2}
        <p>Imported Successfully</p>
      {:else}
        <p>Your entered code is invalid.</p>
      {/if}
    </div>
  </div>
</div>
