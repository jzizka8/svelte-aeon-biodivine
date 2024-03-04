<script lang="ts">
	import { onMount, getContext, onDestroy } from 'svelte';
	import type { Node } from '../../types/types';

	export let node: Node;

	const { getCyInstance } = getContext('graphSharedState') as { getCyInstance: () => any };

	let showNodeMenu = false; // A flag to control the display of the context menu
    const cyInstance = getCyInstance();

	onMount(() => {
		const cyNode = cyInstance.add({
			group: 'nodes',
			data: { ...node }
		});

		cyNode.on('select', () => {
			showNodeMenu = true;
		});

		cyNode.on('unselect', () => {
			showNodeMenu = false;
		});
	});
	onDestroy(() => {
		cyInstance.getElementById(node.id).remove();
	});
</script>
