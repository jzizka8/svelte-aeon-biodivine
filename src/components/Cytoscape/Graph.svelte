<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import cytoscape from 'cytoscape';
	import dagre from 'cytoscape-dagre';
	import { modelStoreActions } from '../../stores/modelStore';
	import { cytoscapeStore } from '../../stores/cytoscapeStore';
	import cytoscapeEdgehandles from 'cytoscape-edgehandles';
	import edgeOptions from './config/edgeOptions';
	import graphStyles from './config/graphStyles';

	setContext('graphSharedState', {
		getCyInstance: () => cyInstance
	});

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;

	onMount(() => {
		cytoscape.use(dagre);
        cytoscape.use(cytoscapeEdgehandles)
        
		cyInstance = cytoscape({
            container: refElement,
			style: graphStyles
		});
        cyInstance.edgehandles(edgeOptions);

		cyInstance.on('dblclick', (e) => {
			modelStoreActions.createVariable(null, e.position);
		});

		cytoscapeStore.set(cyInstance);
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
