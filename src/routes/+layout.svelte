<script lang="ts">
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  import "$lib/styles/global.css";

  import themes from "$lib/assets/themes.json";
  import { movements } from "$lib/assets/movements.json";
  import "$lib/pwa";
  import { preferences, prs, PRs } from "$lib/indy";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";

  let ready = false;

  let theme = "";

  $: {
    if (browser) {
      if (theme) {
        preferences.setItem("theme", theme);
        setTheme(themes[theme]);
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
    preferences.setItem("theme", "myProd");
    theme = "myProd";
  }

  onMount(async () => {
    setUpTheme();

    let allPRs: any = {};
    for (const movement of (await prs.keys()).concat(movements)) {
      let value = prs.getItem(movement);
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
    <div class="flex-1">
      <slot />
    </div>
    <Navigation />
  </div>
{:else}
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Icon icon="line-md:loading-loop" class="text-white text-[128px]" />
  </div>
{/if}
