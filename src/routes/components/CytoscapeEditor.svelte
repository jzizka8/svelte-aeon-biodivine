<script lang="ts">
	import { Graph, GraphNode, GraphEdge, NodeMenu, EdgeMenu } from '$lib/cytoscape';
	import { modelStore } from '$lib/stores/modelStore';

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


<Graph>
	{#each nodes as node (node.id)}
		<GraphNode {node} />
	{/each}

	{#each edges as edge (edge.id)}
		<GraphEdge {edge} />
	{/each}
</Graph>
<NodeMenu />
<EdgeMenu />
