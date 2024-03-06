<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import cytoscape from 'cytoscape';
	import dagre from 'cytoscape-dagre';
	import GraphStyles from './graphStyles';
	import { modelStoreActions } from '../../stores/modelStore';
    import { cytoscapeStore } from '../../stores/cytoscapeStore';

	setContext('graphSharedState', {
		getCyInstance: () => cyInstance
	});

	let refElement: HTMLDivElement;
	let cyInstance: cytoscape.Core;

	onMount(() => {
		cytoscape.use(dagre);

		cyInstance = cytoscape({
			container: refElement,
			style: GraphStyles
		});

		cyInstance.on('add', () => {
			cyInstance
				.makeLayout({
					name: 'cose',
					padding: 50,
					animate: false,
					nodeRepulsion: function (node) {
						return 100000;
					},
					animationDuration: 300,
					refresh: 20,
					fit: true,
					nodeDimensionsIncludeLabels: true
				})
				.run();
		});
		cyInstance.on('dblclick', (e) => {
			modelStoreActions.createVariable(undefined);
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
