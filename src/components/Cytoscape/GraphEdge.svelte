<script>
	import { getContext, onMount } from 'svelte';

	export let edge;

	const { getCyInstance } = getContext('graphSharedState');
	const cyInstance = getCyInstance();

	onMount(() => {
		cyInstance.add({
			group: 'edges',
			id: edge.id,
			data: { ...edge }
		});
	});
</script>
