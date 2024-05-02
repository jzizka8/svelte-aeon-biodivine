import { sveltekit } from '@sveltejs/kit/vite';
import wasmPack from 'vite-plugin-wasm-pack';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), wasmPack(['./aeon-wasm'])],
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		},
		port: 3000
	}
});
