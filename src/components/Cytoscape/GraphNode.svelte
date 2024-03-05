<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import type { Node } from '../../types/types';
	import { selectedNodes } from '../../stores/selectedNodesStore';

	export let node: Node;

	const { getCyInstance } = getContext('graphSharedState') as { getCyInstance: () => any };

	const cyInstance = getCyInstance();

	onMount(() => {
		const cyNode = cyInstance.add({
			group: 'nodes',
			data: { ...node }
		});

		cyNode.on('select', () => {
			const position = cyNode.renderedPosition();
			selectedNodes.addNode(node, position);
		});

		cyNode.on('unselect', () => {
			selectedNodes.removeNode(node.id);
		});
	});
	onDestroy(() => {
		cyInstance.getElementById(node.id).remove();
    	selectedNodes.removeNode(node.id);
	});
</script>
