import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import wasmPack from "vite-plugin-wasm-pack";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [
		sveltekit(),
		wasmPack("./makeyourmax-rust"),
		visualizer({
			emitFile: true,
			filename: "stats.html",
		}),
	],
	define: {
		process: process,
	},
});
