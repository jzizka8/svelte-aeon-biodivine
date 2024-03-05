<script lang="ts">
	import { modelStore, modelStoreActions } from '../stores/modelStore';
	import { selectedNodes } from '../stores/selectedNodesStore';
	$: nodes = $selectedNodes?.nodes;
	$: position = $selectedNodes?.position;
	$: menuStyle =
		nodes && position
			? `position: absolute; top: ${position.y}px; left: ${position.x}px;`
			: '';

	function handleRemove() {
		if (nodes)
		nodes.forEach((node)=> {modelStoreActions.removeVariable(node.id)});
	}

	function handleConnectionFrom() {
		modelStoreActions.createRegulation(nodes[1].id, nodes[0].id);
	}
	function handleConnectionTo() {
		modelStoreActions.createRegulation(nodes[0].id, nodes[1].id);
	}
</script>

<!-- A menu element that is shown for selected graph nodes in the editor. -->
<div id="node-menu" class="float-menu" class:hidden={!nodes?.length} style={menuStyle}>
	<div class="button-row">
		{#if nodes.length === 1}
		<button>
			<img alt="Edit name (E)" id="node-menu-edit-name" class="button" src="img/edit-24px.svg" />
		</button>
		<button>
			<img
				alt="Edit update function (F)"
				id="node-menu-edit-function"
				class="button"
				src="img/functions-24px.svg"
			/>
		</button>
		{/if}
		{#if nodes.length === 2}
		<button  on:click={handleConnectionFrom}>
			edge from here
		</button>
		<button on:click={handleConnectionTo}>
			edge to here
		</button>
		{/if}
		<button on:click={handleRemove}>
			<img alt="Remove (⌫)" id="node-menu-remove" class="button" src="img/delete-24px.svg" />
		</button>
	</div>
	<br />
	<span class="hint invisible">Hint</span>
</div>
