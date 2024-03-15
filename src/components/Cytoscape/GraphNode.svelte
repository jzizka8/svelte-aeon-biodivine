<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import type { Node } from '../../types/types';
	import { selectedNodesStore } from '../../stores/selectedNodesStore';
	import { repositionNodeMenu } from './utils';
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
			selectedNodesStore.addNode(node, position);
		});
		cyNode.on('unselect', () => {
			selectedNodesStore.removeNode(node.id);
			repositionNodeMenu();
		});
		cyNode.on('mouseover', () => {
			cyNode.addClass('hover');
		});
		cyNode.on('mouseout', () => {
			cyNode.removeClass('hover');
		});
	});
	onDestroy(() => {
		cyInstance.getElementById(node.id).remove();
    	selectedNodesStore.removeNode(node.id);
        console.log(` ${node.label} removed from graph`)
	});
</script>
