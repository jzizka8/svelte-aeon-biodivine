<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import dagre from 'cytoscape-dagre';

	import cytoscape from 'cytoscape';
	import graphStyles from './graphStyles';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import { handleSelect, loadBifurcationTree } from './cyHelpers';
	import { cytoscapeTreeStore } from '$lib/stores/cytoscapeTreeStore';

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;

	onMount(() => {
		cyInstance = cytoscape({
			container: refElement,
			style: graphStyles
		});
		cytoscape.use(dagre);

		cyInstance.on('select', (e) => {
			handleSelect(cyInstance, e.target.data());
		});
		cyInstance.on('unselect', (e) => {
			activeTabStore.close();
		});

		// init hotkeys
		// load the tree
		loadBifurcationTree(cyInstance);
		cytoscapeTreeStore.set(cyInstance);
	});
</script>

<div class="graph" bind:this={refElement} id="cytoscape-editor" />

<style>
	.graph {
		inset: 0;
		position: absolute;
	}
</style>
