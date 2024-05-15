<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Node } from '$lib/types/types';
	import { selectedNodesStore } from '$lib/stores/selectedItemsStore';
	import { repositionNodeMenu} from './utils';
	import { hoveredNodeStore } from '$lib/stores/hoveredNodeStore';
	import { cytoscapeManager } from './CytoscapeManager';
	export let node: Node;

	
	const cyInstance = cytoscapeManager.getInstance();

	
	$: nodeLabel = node.label; 
	$: nodeId = node.id;
	$: nodeLabel, cytoscapeManager.updateElementData( nodeId, 'label', nodeLabel);


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
	});
</script>
