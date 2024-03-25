<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import type { Node } from '../../types/types';
	import { selectedNodesStore } from '../../stores/selectedItemsStore';
	import { repositionNodeMenu } from './utils';
	import { hoveredNodeStore } from '../../stores/hoveredNodeStore';
	export let node: Node;

	const { getCyInstance } = getContext('graphSharedState') as { getCyInstance: () => any };

	const cyInstance = getCyInstance();

	onMount(() => {
		const cyNode = cyInstance.add({
			group: 'nodes',
			data: { ...node },
			position: node.initPosition
		});

		cyNode.on('select', () => {
			const position = cyNode.renderedPosition();
			selectedNodesStore.addItem(node, position);
		});
		cyNode.on('unselect', () => {
			selectedNodesStore.removeItem(node.id);
			repositionNodeMenu();
		});
		cyNode.on('mouseover', () => {
			cyNode.addClass('hover');
			hoveredNodeStore.set(node.id);
		});
		cyNode.on('mouseout', () => {
			cyNode.removeClass('hover');
			hoveredNodeStore.set(null);
		});
		cyNode.on('position', repositionNodeMenu);
	});
	onDestroy(() => {
		cyInstance.getElementById(node.id).remove();
    	selectedNodesStore.removeItem(node.id);
        console.log(` ${node.label} removed from graph`)
	});
</script>
