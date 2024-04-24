<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import dagre from 'cytoscape-dagre';

	import cytoscape from 'cytoscape';
	import graphStyles from './graphStyles';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import { handleSelect, loadBifurcationTree } from './cyHelpers';
	import { cytoscapeTreeStore } from '$lib/stores/cytoscapeTreeStore';
	import { initHotkeys, unbindHotkeys } from './hotkeys';

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;

	onMount(() => {
		cytoscape.use(dagre);

		cyInstance = cytoscape({
			container: refElement,
			style: graphStyles
		});
		cytoscapeTreeStore.set(cyInstance);


		cyInstance.on('select', (e) => {
			handleSelect(cyInstance, e.target.data());
		});
		cyInstance.on('unselect', (e) => {
			activeTabStore.close();
		});

		loadBifurcationTree(cyInstance);
		
		initHotkeys(cyInstance);
	});
	onDestroy(() => {
		unbindHotkeys();
	});
</script>

<div class="graph" bind:this={refElement} id="cytoscape-editor" />

<style>
	.graph {
		inset: 0;
		position: absolute;
	}
</style>
