<script>
	import '../app.postcss';
	import { pwaInfo } from "virtual:pwa-info";

	import Navigation from "$components/Navigation.svelte";
	import Sidebar from '$components/Sidebar.svelte';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

	let sidebarOpen = false;
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Navigation on:sidebar-open={(value) => sidebarOpen = value.detail} />
<slot />
<Sidebar on:sidebar-close={(value) => sidebarOpen = value.detail} open={sidebarOpen} />
