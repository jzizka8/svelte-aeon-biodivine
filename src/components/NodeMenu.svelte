<script lang="ts">
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { activeTabStore } from '../stores/activeTabStore';
	import { cytoscapeStore } from '../stores/cytoscapeStore';
	import { edgehandlesStore } from '../stores/edgehandlesStore';
	import { focusedInputStore } from '../stores/focusedVariableInput';
	import { modelStore, modelStoreActions } from '../stores/modelStore';
	import { selectedNodesStore } from '../stores/selectedItemsStore';
	$: nodes = $selectedNodesStore?.items;
	$: position = $selectedNodesStore?.position;
	$: menuStyle =
		nodes && position
			? `position: absolute; top: ${position.y + 15}px; left: ${position.x + 120}px;`
			: '';

	$: loopAllowed =
		nodes?.length === 1 &&
		!$modelStore.regulations.find(
			(reg) => reg.source.id === nodes[0].id && reg.target.id === nodes[0].id
		);

	function handleRemove() {
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
		const cyNode = $cytoscapeStore?.$id(nodes[0].id);
		if (cyNode && $edgehandlesStore) {
			$edgehandlesStore.start(cyNode as any);
		}
	}
	function handleNodeNameEdit() {
		activeTabStore.set('model-editor');
		focusedInputStore.set('name');
	}
	function handleNodeFunctionEdit() {
		activeTabStore.set('model-editor');
		focusedInputStore.set('function');
	}

	onMount(() => {
		hotkeys('e', { keyup: true, keydown: true }, function (event, handler) {
			if (nodes.length != 1) return;
			event.preventDefault();
			handleNodeNameEdit();
		});
		hotkeys('f', { keyup: true, keydown: true }, function (event, handler) {
			if (nodes.length != 1) return;
			event.preventDefault();
			handleNodeFunctionEdit();
		});
		hotkeys('backspace', { keyup: true, keydown: true }, function (event, handler) {
			if (!nodes.length) return;
			event.preventDefault();
			handleRemove();
		});
		hotkeys('l', { keyup: true, keydown: true }, function (event, handler) {
			if (!loopAllowed) return;
			event.preventDefault();
			handleLoopCreation();
		});
	});
</script>

{#if nodes.length > 0}
<div id="node-menu" class="float-menu" style={menuStyle}>
	<div class="button-row">
		{#if nodes.length === 1}
			<button on:click={handleNodeNameEdit}>
				<img alt="Edit name (E)" id="node-menu-edit-name" src="img/edit-24px.svg" />
				<!-- Edit node -->
			</button>
			<button on:click={handleNodeFunctionEdit}>
				<img
					alt="Edit update function (F)"
					id="node-menu-edit-function"
					src="img/functions-24px.svg"
				/>
			</button>
			<button on:mousedown={handleNewEdgeHandle}>
				<img src="img/dot-arrow-up.svg" alt="" draggable="false" />
				<!-- Add edge -->
			</button>
		{/if}
		{#if loopAllowed}
			<button on:click={handleLoopCreation}>
				<img src="img/loop.svg" alt="" />
				<!-- add Loop  -->
			</button>
		{/if}
		{#if nodes.length === 2}
			<button on:click={handleConnectionFrom}>
				<img src="img/dot-arrow-up.svg" alt="" />
				<!-- Connect from -->
			</button>
			<button on:click={handleConnectionTo}
				><img src="img/dot-arrow-down.svg" alt="" />
				<!-- Connect here -->
			</button>
		{/if}
		<button on:click={handleRemove}>
			<img alt="Remove (⌫)" id="node-menu-remove" src="img/delete-24px.svg" />
			<!-- Remove -->
		</button>
	</div>
</div>
{/if}