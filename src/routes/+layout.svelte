<script lang="ts">
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  import "$lib/styles/global.css";

  import themes from "$lib/assets/themes.json";
  import { movements } from "$lib/assets/movements.json";
  import "$lib/pwa";
  import PREFERENCES from "$lib/scripts/preferences";
  import { prs, PRs } from "$lib/indy";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";

  let ready = false;

  let theme = "";

  $: {
    if (browser) {
      if (theme) {
        PREFERENCES.setTheme(theme);
        setTheme(themes[theme]);
        PREFERENCES.save();
      }
    }
  }

  function setTheme(themeData: any) {
    const root = document.querySelector(":root");
    for (const [key, value] of Object.entries(themeData)) {
      if (key !== "meta") {
        for (const [selector, color] of Object.entries(value)) {
          root?.style.setProperty(`--${key}-${selector}`, color);
        }
      }
    }
  }

  async function setUpTheme() {
    theme = "myProd";
  }

  onMount(async () => {
    await PREFERENCES.load();
    setUpTheme();

    let allPRs: any = {};
    for (const movement of (await prs.getKeys()).concat(movements)) {
      let value = await prs.getItemJson(movement);
      if (value) {
        allPRs[movement] = value;
      } else {
        allPRs[movement] = ["Not Set", "Not Set", "Not Set", "Not Set"];
      }
    }
    PRs.set(allPRs);

    ready = true;
  });
</script>

<svelte:head>
  <!--Adapted from https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-for-pwa-in-reactjs#answer-68511528-->
  <link rel="manifest" href="/manifests/myProd.webmanifest" />
</svelte:head>

{#if ready}
  <div class="flex flex-col min-h-screen mb-[-36px]">
    <div class="sticky top-0 safe-top bg-background-950" />
    <div class="flex-1 bg-background-900">
      <slot />
    </div>
    <Navigation />
  </div>
{:else}
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Icon icon="line-md:loading-loop" class="text-white text-[128px]" />
  </div>
{/if}

<style>
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
</style>
