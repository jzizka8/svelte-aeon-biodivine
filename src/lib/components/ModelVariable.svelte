<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Regulation, Variable } from '$lib/types/types';
	import { nextMonotonicity, regulationShortcut } from '$lib/utils/utils';
	import { hoveredNodeStore } from '$lib/stores/hoveredNodeStore';
	import { focusedInputStore } from '$lib/stores/focusedVariableInput';
	import { check_update_function } from 'aeon-wasm';

	import { exportAeonFragment } from '$lib/importExport/';
	import { cytoscapeManager } from '$lib/cytoscape/CytoscapeManager';
	import type { Unsubscriber } from 'svelte/motion';

	export let variable: Variable;
	export let regulations: Regulation[];
	export let isSelected = false;
	export let actions: typeof import('$lib/stores/modelStore').modelStoreActions;

	$: isHover = $hoveredNodeStore === variable.id;
	let updateFunctionInput: HTMLInputElement;
	let variableNameInput: HTMLInputElement;

	function dispatchDelete() {
		actions.removeVariable(variable.id);
	}
	function dispatchMonotonicity(regulation: Regulation) {
		const newMonotonicity = nextMonotonicity(regulation.monotonicity);
		actions.changeMonotonicity(regulation.id, newMonotonicity);
	}
	function dispatchToggleObservable(regulation: Regulation) {
		actions.toggleObservable(regulation.id);
	}
	function dispatchRenameVariable(event: Event) {
		try {
			const id = variable.id;
			const name = variableNameInput.value;
			actions.renameVariable(id, name);
		} catch (e: any) {
			// TODO: create toasterror
			alert(e.message);
			variableNameInput.value = variable.name; //reset to old value
		}
	}
	function handleFunctionChange(event: Event) {
		actions.setVariableUpdateFunction(variable.id, updateFunctionInput.value);
		validateUpdateFunction();
	}

	function handleMouseEnter() {
		hoveredNodeStore.set(variable.id);
		cytoscapeManager.getElementById(variable.id).addClass('hover');
	}
	function handleMouseLeave() {
		hoveredNodeStore.set(null);
		cytoscapeManager.getElementById(variable.id).removeClass('hover');
	}

	let fnValidityText = '';
	let functionValid: boolean;
	// validite the function when the regulations change
	$: regulations, validateUpdateFunction();

	function validateUpdateFunction() {
		try {
			const modelFragment = exportAeonFragment(regulations, variable);
			const valid = check_update_function(modelFragment);
			fnValidityText = `Possible instantiations: ${valid.cardinality}`;
			functionValid = true;
		} catch (e) {
			functionValid = false;
			fnValidityText = `Invalid function: ${e}`;
		}
	}

	let inputStUnsubcriber: Unsubscriber;
	onMount(() => {
		inputStUnsubcriber = focusedInputStore.subscribe((focusedInput) => {
			if (!isSelected || !focusedInput) {
				return;
			}
			if (focusedInput === 'function') {
				updateFunctionInput.focus();
			} else if (focusedInput === 'name') {
				variableNameInput.focus();
			}
			setTimeout(() => focusedInputStore.set(null), 0);
		});
		validateUpdateFunction();
	});
	onDestroy(() => {
		inputStUnsubcriber();
	});
</script>

<div
	class="model-variable"
	class:hover={isHover}
	class:selected={isSelected}
	role="presentation"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<div class="invisible-input">
		<input
			class="variable-name"
			type="text"
			name="variable-name"
			bind:this={variableNameInput}
			value={variable.name}
			style="font-size: 18px;"
			on:change={dispatchRenameVariable}
		/>
	</div>
	<button class="remove-variable-button model-variable-remove" on:click={dispatchDelete}>
		<img alt="Remove variable" src="img/delete-24px.svg" class=" button" />
	</button>
	<br />
	<h4>● Regulators</h4>
	<div class="model-variable-regulators full-line">
		{#each regulations as regulation (regulation.id)}
			<div class="model-regulation">
				<span class="model-regulation-regulator">{regulation.source.name}</span>
				<span class="model-regulation-short">{regulationShortcut(regulation)}</span>
				<button
					class={`model-regulation-observable observable--${regulation.observable}`}
					on:click={() => dispatchToggleObservable(regulation)}
				>
					{regulation.observable ? 'observable' : 'non-observable'}
				</button>
				<button
					class={`model-regulation-monotonicity monotonicity--${regulation.monotonicity}`}
					on:click={() => dispatchMonotonicity(regulation)}
				>
					{regulation.monotonicity}
				</button>
			</div>
		{/each}
	</div>
	<h4>● Update Function</h4>
	<input
		class="variable-function"
		style="font-size: 16px; text-align: center;"
		bind:this={updateFunctionInput}
		placeholder={`f(${variable.name})`}
		value={variable.updateFunction}
		on:change={handleFunctionChange}
	/>
	<div class="variable-function-status" class:red={!functionValid}>
		{fnValidityText}
	</div>
</div>

<style>
	.variable-function {
		border: none;
		background-color: transparent;
		width: 100%;
	}
</style>
