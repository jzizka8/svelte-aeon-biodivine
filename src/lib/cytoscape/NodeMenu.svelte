<script lang="ts">
	import hotkeys from 'hotkeys-js';
	import { onMount, tick } from 'svelte';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import { focusedInputStore } from '$lib/stores/focusedVariableInput';
	import { modelStore, modelStoreActions } from '$lib/stores/modelStore';
	import { selectedNodesStore } from '$lib/stores/selectedItemsStore';
	import { writable } from 'svelte/store';
	import { hintAction } from '$lib/actions/hintAction';
	import { cytoscapeManager } from './CytoscapeManager';

	$: nodes = $selectedNodesStore?.items;
	$: position = $selectedNodesStore?.position;
	$: menuStyle = nodes && position ? `top: ${position.y + 15}px; left: ${position.x + 70}px;` : '';

	$: loopAllowed =
		nodes?.length === 1 &&
		!$modelStore.regulations.find(
			(reg) => reg.source.id === nodes[0].id && reg.target.id === nodes[0].id
		);
	$: connectFromAllowed =
		nodes?.length === 2 &&
		!$modelStore.regulations.find(
			(reg) => reg.source.id === nodes[1].id && reg.target.id === nodes[0].id
		);

	$: connectHereAllowed =
		nodes?.length === 2 &&
		!$modelStore.regulations.find(
			(reg) => reg.source.id === nodes[0].id && reg.target.id === nodes[1].id
		);
	const hint = writable('');

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
		const cyNode = cytoscapeManager.getElementById(nodes[0].id);
		if (cyNode) {
			cytoscapeManager.getEdgeHandles().start(cyNode as any);
		}
	}
	async function handleNodeNameEdit() {
		activeTabStore.set('model-editor');
		await tick(); // Wait for the DOM to update
		focusedInputStore.set('name');
	}
	async function handleNodeFunctionEdit() {
		activeTabStore.set('model-editor');
		await tick(); // Wait for the DOM to update
		focusedInputStore.set('function');
	}

	onMount(() => {
		hotkeys('e', function (event, handler) {
			if (nodes.length != 1) return;
			event.preventDefault();
			handleNodeNameEdit();
		});
		hotkeys('f', function (event, handler) {
			if (nodes.length != 1) return;
			event.preventDefault();
			handleNodeFunctionEdit();
		});
		hotkeys('backspace', function (event, handler) {
			if (!nodes.length) return;
			event.preventDefault();
			handleRemove();
		});
		hotkeys('l', function (event, handler) {
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
				<button use:hintAction={{ hint, hintText: 'Edit name (E)' }} on:click={handleNodeNameEdit}>
					<img alt="Edit name (E)" id="node-menu-edit-name" src="img/edit-24px.svg" />
					<!-- Edit node -->
				</button>
				<button
					use:hintAction={{ hint, hintText: 'Edit update function (F)' }}
					on:click={handleNodeFunctionEdit}
				>
					<img
						alt="Edit update function (F)"
						id="node-menu-edit-function"
						src="img/functions-24px.svg"
					/>
				</button>
				<button use:hintAction={{ hint, hintText: 'Add edge' }} on:mousedown={handleNewEdgeHandle}>
					<img src="img/dot-arrow-up.svg" alt="" draggable="false" />
					<!-- Add edge -->
				</button>
			{/if}
			{#if loopAllowed}
				<button use:hintAction={{ hint, hintText: 'Add loop (L)' }} on:click={handleLoopCreation}>
					<img src="img/loop.svg" alt="" />
					<!-- add Loop  -->
				</button>
			{/if}
			{#if connectFromAllowed}
				<button use:hintAction={{ hint, hintText: 'Connect from' }} on:click={handleConnectionFrom}>
					<img src="img/dot-arrow-up.svg" alt="" />
					<!-- Connect from -->
				</button>
			{/if}
			{#if connectHereAllowed}
				<button use:hintAction={{ hint, hintText: 'Connect here' }} on:click={handleConnectionTo}
					><img src="img/dot-arrow-down.svg" alt="" />
					<!-- Connect here -->
				</button>
			{/if}
			<button use:hintAction={{ hint, hintText: 'Remove (⌫)' }} on:click={handleRemove}>
				<img alt="Remove (⌫)" id="node-menu-remove" src="img/delete-24px.svg" />
				<!-- Remove -->
			</button>
		</div>
		{#if $hint}
			<div class="hint">{$hint}</div>
		{/if}
	</div>
{/if}
