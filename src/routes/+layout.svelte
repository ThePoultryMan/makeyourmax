<script lang="ts">
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import themes from "$lib/assets/themes.json";
  import info from "$lib/assets/info.json";
  import "$lib/pwa";
  import { preferences } from "$lib/indy";
  import { getBrandTheme } from "$lib/vercel-config";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";
  import Sidebar from "$components/Sidebar.svelte";
  import WebManifest from "$lib/pwa";
  import { hexToRGB } from "$lib/util";

  let ready = false;
  let brand = {
    key: $page.url.searchParams.get("b"),
    logo: {
      src: null,
      alt: null,
    },
  };
  let webManifest = new WebManifest(brand.key);
  let jsonManifest = JSON.stringify(webManifest);

  let pwaAccept = $page.url.searchParams.get("mode");
  let installEvent;
  let sidebarOpen = false;
  let theme = "";

  $: {
    if (browser && !brand.valid) {
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
          root.style.setProperty(`--${key}-${selector}`, color);
        }
      }
    }
    webManifest.setThemeColor(hexToRGB(root.style.getPropertyValue("--background-950")));
    jsonManifest = JSON.stringify(webManifest);
  }

  async function setUpTheme() {
    await preferences.getItem("theme").then((themeValue) => {
      if (!themeValue) {
        preferences.setItem("theme", "myProd");
        theme = "myProd";
      } else {
        theme = themeValue;
      }
    });
  }

  onMount(async () => {
    let themeData;
    if ($page.url.searchParams.get("mode") === "pwa") {
      let storedBrand: any = await preferences.getItem("brand");
      if (storedBrand) {
        themeData = await getBrandTheme(storedBrand);
      } else if (brand.key) {
        themeData = await getBrandTheme(brand.key);
      }
    } else {
      if (brand.key) {
        themeData = await getBrandTheme(brand.key);
      }
    }

    if (themeData) {
      setTheme(themeData);
      brand.logo = themeData.meta.logo;
    } else {
      brand.key = null;
      setUpTheme();
    }

    ready = true;

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installEvent = event;
    });
  });
</script>

<svelte:head>
  <!--Adapted from https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-for-pwa-in-reactjs#answer-68511528-->
  <link rel="manifest" href={"data:application/json;charset=utf-8," + jsonManifest} />
</svelte:head>

{#if ready}
  {#if !pwaAccept}
    <div class="flex flex-col px-5 md:px-32 min-h-screen min-w-full items-center justify-center [&>p]:mb-2">
      <p>
        <i>Make Your Max</i> is designed to be installed on your device as if it was a regular app.
        Using it in a browser is unsupported. If you would like to continue in the browser, please
        note that any information between the installed and browser version will <em>not</em> sync.
      </p>
      <p>
        To install <i>Make Your Max</i> to your (ios) device, click <i>Share > Add To Home Screen</i>
      </p>
      <p>
        <i>Note: If you are seeing this pop up but you have already installed the app, please reinstall.</i>
      </p>
      <!--Only works on Chrome-->
      <!--<button on:click={() => installEvent.prompt()} class="p-2 bg-accent-500 rounded-lg">Install</button>-->
      <button on:click={() => pwaAccept = "accept"} class="p-2 border border-accent-500 rounded-lg">Continue Anyway</button>
    </div>
  {:else}
    <div class="flex flex-col min-h-screen mb-[-36px]">
      <div class="flex-1">
        <slot />
      </div>
      <Navigation
        on:sidebar-open={(value) => (sidebarOpen = value.detail)}
        brandLogo={brand.logo}
      />
    </div>
    <Sidebar
      on:sidebar-close={(value) => (sidebarOpen = value.detail)}
      on:set-theme={(value) => (theme = value.detail)}
      open={sidebarOpen}
      currentTheme={theme}
      showThemeSelect={brand.key === null}
    />
  {/if}
{:else}
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Icon icon="line-md:loading-loop" class="text-white text-[128px]" />
  </div>
{/if}
