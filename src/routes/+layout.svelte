<script lang="ts">
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import themes from "$lib/assets/themes.json";
  import info from "$lib/assets/info.json";
  import "$lib/pwa";
  import { preferences } from "$lib/indy";
  import { doesBrandThemeExist, getBrandTheme } from "$lib/vercel-config";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";
  import Sidebar from "$components/Sidebar.svelte";
  import WebManifest from "$lib/pwa";
  import { hexToRGB } from "$lib/util";

  let webManifest = new WebManifest($page.url.toString());
  let jsonManifest = JSON.stringify(webManifest);
  let ready = false;

  let sidebarOpen = false;
  let theme = "";
  let brand = $page.url.searchParams.get("b");

  $: {
    if (browser) {
      preferences.setItem("theme", theme);
      let themeData;
      if (brand) {
        doesBrandThemeExist(brand).then((exists) => {
          if (exists) {
            getBrandTheme(brand).then((response) => {
              themeData = response.value;
              setTheme(themeData);
            });
          } else {
            setNormalTheme();
          }
        });
      } else {
        setNormalTheme();
      }
    }
  }

  function setNormalTheme() {
    let themeData = themes[theme ? theme : "myProd"];
    setTheme(themeData);
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

    ready = true; // The only condition for being ready is the theme being loaded.
  }

  onMount(async () => {
    await preferences.getItem("theme").then((themeValue) => {
      if (!themeValue) {
        preferences.setItem("theme", "myProd");
        theme = "myProd";
      } else {
        theme = themeValue;
      }
    });
  });
</script>

<svelte:head>
  <!--Adapted from https://stackoverflow.com/questions/52997333/how-to-create-dynamic-manifest-json-file-for-pwa-in-reactjs#answer-68511528-->
  <link rel="manifest" href={"data:application/json;charset=utf-8," + jsonManifest} />
</svelte:head>

{#if ready}
  <div class="flex flex-col min-h-screen">
    <Navigation on:sidebar-open={(value) => (sidebarOpen = value.detail)} {brand} />
    <div class="flex-1">
      <slot />
    </div>
    <footer class="p-3 bg-background-950 text-text-400 text-center">
      <span>Make Your Max v{info.version}</span>
    </footer>
  </div>
  <Sidebar
    on:sidebar-close={(value) => (sidebarOpen = value.detail)}
    on:set-theme={(value) => (theme = value.detail)}
    open={sidebarOpen}
    currentTheme={theme}
    showThemeSelect={brand === null}
  />
{:else}
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Icon icon="line-md:loading-loop" class="text-white text-[128px]" />
  </div>
{/if}
