<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import cytoscape from 'cytoscape';
	import dagre from 'cytoscape-dagre';
	import { modelStoreActions } from '../../stores/modelStore';
	import { cytoscapeStore } from '../../stores/cytoscapeStore';
	import cytoscapeEdgehandles, { type EdgeHandlesInstance } from 'cytoscape-edgehandles';
	import edgeOptions from './config/edgeOptions';
	import graphStyles from './config/graphStyles';

	import { repositionContextMenus } from './utils';
	import { edgehandlesStore } from '../../stores/edgehandlesStore';

	setContext('graphSharedState', {
		getCyInstance: () => cyInstance
	});

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;
	let edgehandles: EdgeHandlesInstance;
	onMount(() => {
		cytoscape.use(dagre);
        cytoscape.use(cytoscapeEdgehandles)
        
		cyInstance = cytoscape({
            container: refElement,
			style: graphStyles
		});
        edgehandles = cyInstance.edgehandles(edgeOptions);
		edgehandles.enable();

		cyInstance.on('dblclick', (e) => {
			modelStoreActions.createVariable(null, e.position);
		});

		cyInstance.on('pan', repositionContextMenus);


        cyInstance.on('ehcomplete', (event, sourceNode, targetNode, addedEdge) => {
            addedEdge.remove();
            modelStoreActions.createRegulation(sourceNode.data('id'), targetNode.data('id'));
        });

		cytoscapeStore.set(cyInstance);
		edgehandlesStore.set(edgehandles);
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
