<script>
  import "../app.postcss";
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";

	import themes from "$lib/assets/themes.json";
  import { preferences } from "$lib/indy";

  import Navigation from "$components/Navigation.svelte";
  import Sidebar from "$components/Sidebar.svelte";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

  let sidebarOpen = false;
  let theme = "";

  onMount(async () => {
    await preferences.getItem("theme", (themeValue) => {
      if (!themeValue) {
        preferences.setItem("theme", "frightenedPurple");
        theme = "frightenedPurple";
      } else {
        theme = themeValue;
      }
    });

		// Set Theme
		let themeData = themes[theme];
		const root = document.querySelector(":root");
		for (const [key, value] of Object.entries(themeData)) {
			if (key !== "meta") {
				for (const [selector, color] of Object.entries(value)) {
					root.style.setProperty(`--${key}-${selector}`, color);
				}
			}
		}
  });
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>

<Navigation on:sidebar-open={(value) => (sidebarOpen = value.detail)} />
<slot />
<Sidebar on:sidebar-close={(value) => (sidebarOpen = value.detail)} open={sidebarOpen} />
