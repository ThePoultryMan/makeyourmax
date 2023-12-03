<script>
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { pwaInfo } from "virtual:pwa-info";
  import { onMount } from "svelte";

  import themes from "$lib/assets/themes.json";
  import brandThemes from "$lib/assets/brandthemes.json";
  import { preferences } from "$lib/indy";

  import Icon from "@iconify/svelte";

  import Navigation from "$components/Navigation.svelte";
  import Sidebar from "$components/Sidebar.svelte";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

  let ready = false;

  let sidebarOpen = false;
  let theme = "";
  let brand = $page.url.searchParams.get("b");

  $: {
    if (browser) {
      preferences.setItem("theme", theme);
      let themeData = !brand ? themes[theme ? theme : "myProd"] : brandThemes[brand];
      const root = document.querySelector(":root");
      for (const [key, value] of Object.entries(themeData)) {
        if (key !== "meta") {
          for (const [selector, color] of Object.entries(value)) {
            root.style.setProperty(`--${key}-${selector}`, color);
          }
        }
      }
    }
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
    ready = true;
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

{#if ready}
  <div class="flex flex-col min-h-screen">
    <Navigation on:sidebar-open={(value) => (sidebarOpen = value.detail)} brand={brand} />
    <div class="flex-1">
      <slot />
    </div>
    {#if brand}
      <footer class="p-3 bg-background-950 text-center">
        <span>Make Your Max</span>
      </footer>
    {/if}
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
