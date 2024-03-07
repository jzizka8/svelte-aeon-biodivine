<script lang="ts">
	import Graph from './Graph.svelte';
	import GraphNode from './GraphNode.svelte';
	import GraphEdge from './GraphEdge.svelte';
	import { modelStore } from '../../stores/modelStore';

	$: nodes = $modelStore.variables.map((variable) => ({
        id: variable.id,
        label: variable.name
    }));

	$: edges = $modelStore.regulations.map((regulation) => ({
        observable: regulation.observable
</script>

<Graph>
	{#each nodes as node (node.id)}
		<GraphNode {node} />
	{/each}

	{#each edges as edge (edge.id)}
		<GraphEdge {edge} />
	{/each}
</Graph>