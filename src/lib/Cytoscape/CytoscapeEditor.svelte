<script lang="ts">
	import Graph from './Graph.svelte';
	import GraphNode from './GraphNode.svelte';
	import GraphEdge from './GraphEdge.svelte';
	import { modelStore } from '$lib/stores/modelStore';
	import NodeMenu from './NodeMenu.svelte';
	import EdgeMenu from './EdgeMenu.svelte';

	$: nodes = $modelStore.variables.map((variable) => ({
		id: variable.id,
		label: variable.name,
		initPosition: variable.initPosition
	}));

	$: edges = $modelStore.regulations.map((regulation) => ({
		id: regulation.id,
		source: regulation.source.id,
		target: regulation.target.id,
		monotonicity: regulation.monotonicity,
		observable: regulation.observable
	}));
</script>

<NodeMenu />
<EdgeMenu />
<Graph>
	{#each nodes as node (node.id)}
		<GraphNode {node} />
	{/each}

	{#each edges as edge (edge.id)}
		<GraphEdge {edge} />
	{/each}
</Graph>
