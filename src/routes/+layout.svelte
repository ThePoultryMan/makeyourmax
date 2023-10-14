<script>
	import '../app.postcss';
	import { pwaInfo } from "virtual:pwa-info";

	import Navigation from "$components/Navigation.svelte";

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Navigation />
<slot />
