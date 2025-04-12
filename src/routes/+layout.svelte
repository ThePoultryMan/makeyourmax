<script lang="ts">
  import "../app.postcss";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import "$lib/styles/global.css";

  import { movements } from "$lib/assets/movements.json";
  import themes from "$lib/assets/themes.json";
  import "$lib/pwa";
  import { prs, PRs } from "$lib/indy";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";
  import { preferences } from "$lib/scripts/stores.svelte";
  import { invoke } from "@tauri-apps/api/core";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let ready = $state(false);
  let preferencesPromise: Promise<void> | undefined = $state();

  let pwaAccept = $state($page.url.searchParams.get("mode"));

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

  onMount(async () => {
    preferencesPromise = preferences.setUp();
    preferencesPromise.then(async () => {
      preferences.setTheme("MyProd");

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

      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
      });
    });
  });
  $effect(() => {
    if (preferences.get()) {
      setTheme(themes[preferences.get().theme]);
    }
  });
  $effect(() => {
    if (preferences.get()) {
      invoke("save_preferences", {
        frontendPreferences: preferences.get(),
      });
    }
  });
</script>

<svelte:head>
  <!--Adapted from https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-for-pwa-in-reactjs#answer-68511528-->
  <link rel="manifest" href="/manifests/myProd.webmanifest" />
</svelte:head>

{#await preferencesPromise then _}
  {#if !pwaAccept}
    <div
      class="flex flex-col px-5 md:px-32 min-h-screen min-w-full items-center justify-center [&>p]:mb-2"
    >
      <p>
        <i>Make Your Max</i> is designed to be installed on your device as if it was a regular app.
        Using it in a browser is unsupported. If you would like to continue in the browser, please
        note that any information between the installed and browser version will <em>not</em> sync.
      </p>
      <p>
        To install <i>Make Your Max</i> to your (ios) device, click
        <i>Share > Add To Home Screen</i>
      </p>
      <p>
        <i
          >Note: If you are seeing this pop up but you have already installed the app, please
          reinstall.</i
        >
      </p>
      <button onclick={() => (pwaAccept = "accept")} class="p-2 border border-accent-500 rounded-lg"
        >Continue Anyway</button
      >
    </div>
  {:else}
    <div class="flex flex-col min-h-screen mb-[-36px]">
      <div class="flex-1">
        {@render children?.()}
      </div>
      <Navigation />
    </div>
  {/if}
{/await}
