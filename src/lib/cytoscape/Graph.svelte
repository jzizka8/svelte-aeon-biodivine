<script lang="ts">
	import { onMount } from 'svelte';
	import type cytoscape from 'cytoscape';
	import { modelStoreActions } from '$lib/stores/modelStore';
	import edgeOptions from './config/edgeOptions';
	import graphStyles from './config/graphStyles';

	import { repositionContextMenus } from './utils';
	import hotkeys from 'hotkeys-js';
	import { cytoscapeManager } from './CytoscapeManager';

	let cyInstance: cytoscape.Core;
	let refElement: HTMLDivElement;
	onMount(() => {
		cyInstance = cytoscapeManager.initCytoscape({
			container: refElement,
			style: graphStyles
		})
		cytoscapeManager.initEdgeHandles(edgeOptions);

		cyInstance.on('dblclick', (e) => {
			modelStoreActions.createVariable(null, e.position);
		});

		cyInstance.on('pan', repositionContextMenus);

		cyInstance.on('ehcomplete', (event, sourceNode, targetNode, addedEdge) => {
			addedEdge.remove();
			modelStoreActions.createRegulation(sourceNode.data('id'), targetNode.data('id'));
		});

		hotkeys('n', function (event, handler) {
			event.preventDefault();
			modelStoreActions.createVariable(null);
		});
	});
</script>

<div class="graph" bind:this={refElement}>
	{#if cyInstance}
		<slot />
	{/if}
</div>

<style>
	.graph {
		inset: 0;
	}
</style>
