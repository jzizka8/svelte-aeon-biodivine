<script lang="ts">
	import { onMount } from 'svelte';

	import QuickHelp from './components/QuickHelp.svelte';
	import CytoscapeEditor from './components/CytoscapeEditor.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import LogoType from '$lib/components/LogoType.svelte';

	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import TabWrapper from '$lib/components/TabWrapper.svelte';
	import { init as scriptInit } from '../script/main';
	import { modelStore } from '$lib/stores/modelStore';
	import init from 'aeon-wasm';

	const AEON_MODEL = `
		v_Sp8 -| v_Emx2
		v_Coup_fti -> v_Emx2
		v_Pax6 -| v_Emx2
		v_Fgf8 -| v_Emx2
		v_Emx2 -| v_Sp8
		v_Fgf8 -> v_Sp8
		v_Sp8 -| v_Coup_fti
		v_Fgf8 -| v_Coup_fti
		v_Sp8 -> v_Pax6
		v_Coup_fti -| v_Pax6
		v_Emx2 -| v_Pax6
		v_Sp8 -> v_Fgf8
		v_Emx2 -| v_Fgf8
		v_Fgf8 -> v_Fgf8
		$v_Coup_fti: (!(v_Fgf8 | v_Sp8) | !(v_Sp8 | v_Fgf8))
		$v_Emx2: (v_Coup_fti & !((v_Fgf8 | v_Sp8) | v_Pax6))
		#$v_Fgf8: ((v_Fgf8 & v_Sp8) & !v_Emx2)
		#$v_Pax6: (v_Sp8 & !(v_Emx2 | v_Coup_fti))
		#$v_Sp8: (v_Fgf8 & !v_Emx2)
		`;

	onMount(async () => {
		await init();
		scriptInit();

		console.log('aeon init done.');

		const worker = new Worker(new URL('../compute_worker.js', import.meta.url), { type: 'module' });
		worker.onmessage = (e) => {
			if (e.data['type'] == 'progress') {
				console.log('Partial:', e.data['data']);
			} else if (e.data['type'] == 'result') {
				console.log('Done:', e.data['data']);
				let tree_data = e.data['tree_data'];
				console.log(tree_data);
				let tree = DecisionTree.from_tree_data(tree_data);
				console.log(tree);
				console.log(tree.get_full_tree());
				console.log(tree.get_attributes(0));
				console.log(tree.auto_expand(0, 3));
				worker.terminate(); // worker is no longer needed.
			} else if (e.data['type'] == 'error') {
				console.log('Error', e.data['error']);
			}
		};
		worker.postMessage({ model: AEON_MODEL });
		// Use worker.terminate() to cancel the computation.
		console.log('Message sent.');
	});
</script>

<svelte:head>
	<title>{$modelStore.name} | AEON</title>
</svelte:head>
<main class="index-page">
	<!-- active tab can be opened from side menu and from the tab wrapper -->

	<SideMenu />
	<TabWrapper />
	<CytoscapeEditor />

	<div id="cytoscape-editor" />
	<!-- absolutely positioned stuff -->
	<LogoType />
	<LoadingIndicator />
	<QuickHelp />
</main>

<style>
</style>
