<script>
  import "../app.postcss";
  import { browser } from "$app/environment";
  import { pwaInfo } from "virtual:pwa-info";
  import { onMount } from "svelte";

  import themes from "$lib/assets/themes.json";
  import { preferences } from "$lib/indy";

  import Navigation from "$components/Navigation.svelte";
  import Sidebar from "$components/Sidebar.svelte";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

  let sidebarOpen = false;
  let theme = "";

  $: {
    if (browser) {
      preferences.setItem("theme", theme);
      let themeData = themes[theme ? theme : "myProd"];
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
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<Navigation on:sidebar-open={(value) => (sidebarOpen = value.detail)} />
<slot />
<Sidebar
  on:sidebar-close={(value) => (sidebarOpen = value.detail)}
  on:set-theme={(value) => (theme = value.detail)}
  open={sidebarOpen}
  currentTheme={theme}
/>
