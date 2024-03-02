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
        id: regulation.id,
        source: regulation.source.id,
        target: regulation.target.id,
        monotonicity: regulation.monotonicity
    }));
</script>

<Graph>
	{#each nodes as node}
		<GraphNode {node} />
	{/each}

	{#each edges as edge}
		<GraphEdge {edge} />
	{/each}
</Graph>