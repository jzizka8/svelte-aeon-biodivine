<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Edge } from '$lib/types/types';
	import { selectedEdgesStore } from '$lib/stores/selectedItemsStore';
	import { getEdgeMenuPosition, repositionEdgeMenu} from './utils';
	import { cytoscapeManager } from './CytoscapeManager';

	export let edge: Edge;

	
	const cyInstance = cytoscapeManager.getInstance();
	$: edgeId = edge.id;
	$: edgeMonotonicity = edge.monotonicity;
	$: edgeObservable = edge.observable;

	$: edgeMonotonicity, cytoscapeManager.updateElementData( edgeId, 'monotonicity', edgeMonotonicity);
	$: edgeObservable, cytoscapeManager.updateElementData( edgeId, 'observable', edgeObservable);
	
	onMount(() => {
		const cyEdge = cyInstance.add({
			group: 'edges',
			data: { ...edge }
		});

		cyEdge.on('select', () => {
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
