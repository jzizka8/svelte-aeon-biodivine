<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Regulation } from '../../types/types';
	import { selectedEdgesStore } from '../../stores/selectedItemsStore';
	import { repositionEdgeMenu } from './utils';

	export let edge: Regulation;

	const { getCyInstance } = getContext('graphSharedState');
	const cyInstance = getCyInstance();

	onMount(() => {
		const cyEdge = cyInstance.add({
			group: 'edges',
			id: edge.id,
			data: { ...edge }
		});

		cyEdge.on('select', () => {
			console.log('edge selected');
			let boundingBox = cyEdge.renderedBoundingBox();
			const position = {
				x: (boundingBox.x1 + boundingBox.x2) / 2,
				y: (boundingBox.y1 + boundingBox.y2) / 2
			};
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
