import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: "Make Your Max",
				short_name: "Make Your Max",
				description: "An app to keep track of your PRs.",
				lang: "en",
				dir: "ltr",
				start_url: "/",
				display: "standalone",
				display_override: [ "windows-control-overlay" ],
				orientation: "portrait",
				id: "/",
				icons: [
					{
						src: "maxer-192.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
			},
		}),
	],
});
