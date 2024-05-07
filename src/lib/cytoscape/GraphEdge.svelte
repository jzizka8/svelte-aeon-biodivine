<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Edge } from '$lib/types/types';
	import { selectedEdgesStore } from '$lib/stores/selectedItemsStore';
	import { getEdgeMenuPosition, repositionEdgeMenu, updateElementData } from './utils';

	export let edge: Edge;

	const { getCyInstance } = getContext('graphSharedState') as {
		getCyInstance: () => cytoscape.Core;
	};
	const cyInstance = getCyInstance();

	onMount(() => {
		const cyEdge = cyInstance.add({
			group: 'edges',
			data: { ...edge }
		});

		cyEdge.on('select', () => {
			console.log('edge selected');
			const position  = getEdgeMenuPosition(cyEdge);
			selectedEdgesStore.addItem(edge, position);
		});
		cyEdge.on('unselect', () => {
			selectedEdgesStore.removeItem(edge.id);
			repositionEdgeMenu();
		});
		cyEdge.on('mouseover', () => {
			cyEdge.addClass('hover');
		});
		cyEdge.on('mouseout', () => {
			cyEdge.removeClass('hover');
		});
		cyEdge.on('position', repositionEdgeMenu);
	});
	onDestroy(() => {
		cyInstance.getElementById(edge.id).remove();
		selectedEdgesStore.removeItem(edge.id);
	});
</script>
