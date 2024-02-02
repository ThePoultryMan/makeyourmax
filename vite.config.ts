import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			workbox: {
				cleanupOutdatedCaches: true,
			}
		}),
	],
	define: {
		process: process,
	},
});
