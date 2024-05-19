<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import dagre from 'cytoscape-dagre';

	import cytoscape from 'cytoscape';
	import graphStyles from './graphStyles';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import { handleSelect } from './cyHelpers';
	import { initHotkeys, unbindHotkeys } from './hotkeys';
	import { loadBifurcationTree } from './services';
	import init from 'aeon-wasm';
	import { treeCytoscapeManager } from './treeCytoscapeManager';

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;

	export let noTreeAction: () => void = () => {};

	export let showHelp: boolean;

	onMount(async () => {
		await init();

		cytoscape.use(dagre);

		cyInstance = treeCytoscapeManager.initCytoscape({
			container: refElement,
			style: graphStyles
		});

		cyInstance.on('select', (e) => {
			showHelp = false;
			if (e.target.isEdge()) return;
			handleSelect(cyInstance, e.target.data());
		});
		cyInstance.on('unselect', (e) => {
			activeTabStore.close();
		});

		try {
			loadBifurcationTree();
		} catch (e) {
			noTreeAction();
		}

		initHotkeys(cyInstance);
	});
	onDestroy(() => {
		unbindHotkeys();
	});
</script>

<div class="graph" bind:this={refElement} id="cytoscape-tree-editor" />

<style>
	.graph {
		inset: 0;
		position: absolute;
		overflow: hidden;
	}
</style>
