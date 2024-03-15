<script lang="ts">
	import { cytoscapeStore } from '../stores/cytoscapeStore';
	import { modelStore, modelStoreActions } from '../stores/modelStore';
	import { selectedNodesStore } from '../stores/selectedNodesStore';
	$: nodes = $selectedNodesStore?.nodes;
	$: position = $selectedNodesStore?.position;
	$: menuStyle =
		nodes && position ? `position: absolute; top: ${position.y+15}px; left: ${position.x+120}px;` : '';

	function handleRemove() {
		console.log('remove');
		if (nodes) {
			nodes.forEach((node) => {
				modelStoreActions.removeVariable(node.id);
			});
		}
	}

	function handleConnectionFrom() {
		modelStoreActions.createRegulation(nodes[1].id, nodes[0].id);
	}

	function handleConnectionTo() {
		modelStoreActions.createRegulation(nodes[0].id, nodes[1].id);
	}

	function handleLoopCreation() {
		modelStoreActions.createRegulation(nodes[0].id, nodes[0].id);
	}

	function handleNewEdgeHandle() {
		$cytoscapeStore?.edgehandles().start(nodes[0].id);
	}
</script>

<!-- A menu element that is shown for selected graph nodes in the editor. -->
<div id="node-menu" class="float-menu" class:hidden={!nodes?.length} style={menuStyle}>
	<div class="button-row">
		{#if nodes.length === 1}
			<button>
				<img alt="Edit name (E)" id="node-menu-edit-name" src="img/edit-24px.svg" />
				Edit node
			</button>
			<button>
				<img
					alt="Edit update function (F)"
					id="node-menu-edit-function"
					src="img/functions-24px.svg"
				/>
			</button>
			<button on:click={handleLoopCreation}> <img src="img/loop.svg" alt="" />add Loop </button>
			<!-- <button on:click={handleNewEdgeHandle}> edge from here </button> -->
		{/if}
		{#if nodes.length === 2}
			<button on:click={handleConnectionFrom}>
				<img src="img/dot-arrow-up.svg" alt="" />
				Connect from
			</button>
			<button on:click={handleConnectionTo}
				><img src="img/dot-arrow-down.svg" alt="" /> 
				Connect here
			</button>
		{/if}
		<button on:click={handleRemove}>
			<img alt="Remove (⌫)" id="node-menu-remove" src="img/delete-24px.svg" />
			Remove
		</button>
	</div>
</div>
