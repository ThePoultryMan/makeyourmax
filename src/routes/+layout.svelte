<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";

  import "$lib/styles/global.css";

  import themes from "$lib/assets/themes.json";
  import "$lib/pwa";

  import Navigation from "$components/Navigation.svelte";
  import { preferences, scores } from "$lib/scripts/stores.svelte";
  import { invoke } from "@tauri-apps/api/core";
  import TopBar from "$components/TopBar.svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let ready = $state(false);
  let storePromises: Promise<void[]> | undefined = $state();

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

  $inspect(preferences.get());
  $inspect(scores.get());

  onMount(async () => {
    storePromises = Promise.all([preferences.setUp(), scores.setUp()]);
    storePromises.then(async () => {
      ready = true;

      preferences.setTheme("MyProd");

      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
      });
    });
  });
  $effect(() => {
    if (ready) {
      setTheme(themes[preferences.get().theme]);
    }
  });
  $effect(() => {
    if (ready) {
      invoke("save_preferences", {
        frontendPreferences: preferences.get(),
      });
    }
  });
  $effect(() => {
    if (ready) {
      scores.setBackendSynced(false);
      invoke("save_scores", {
        frontendScores: scores.get(),
      }).then(() => scores.setBackendSynced(true));
    }
  });
</script>

<svelte:head>
  <!--Adapted from https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-for-pwa-in-reactjs#answer-68511528-->
  <link rel="manifest" href="/manifests/myProd.webmanifest" />
</svelte:head>

{#if ready}
  <div class="flex flex-col min-h-screen max-h-screen">
    <TopBar />
    <div class="flex-1 overflow-scroll">
      {@render children?.()}
    </div>
    <Navigation />
  </div>
{/if}
