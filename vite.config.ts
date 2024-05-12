import { sveltekit } from '@sveltejs/kit/vite';
import wasmPack from 'vite-plugin-wasm-pack';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		wasmPack(['./aeon-wasm']),
		viteStaticCopy({
			targets: [
				{
					src: 'aeon-wasm/pkg/aeon_wasm_bg.wasm',
					dest: '_app/immutable/workers/assets'
				}
			]
		})
	],
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		},
		port: 3000
	}
});
