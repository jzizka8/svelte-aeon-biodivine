<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Regulation, Variable } from '$lib/types/types';
	import { regulationShortcut } from '$lib/utils/utils';
	import { hoveredNodeStore } from '$lib/stores/hoveredNodeStore';
	import { focusedInputStore } from '$lib/stores/focusedVariableInput';
	import {check_update_function} from 'aeon-wasm';

	import { exportAeonFragment } from '$lib/importExport/';
	import { cytoscapeManager } from '$lib/cytoscape/CytoscapeManager';

	export let variable: Variable;
	export let regulations: Regulation[];
	export let isSelected = false;

	$: isHover = $hoveredNodeStore === variable.id;
	let updateFunctionInput: HTMLElement;
	let variableNameInput: HTMLInputElement;
	
	const dispatch = createEventDispatcher();
	function dispatchDelete() {
		dispatch('delete', { variable });
	}
	function dispatchMonotonicity(regulation: Regulation) {
		dispatch('changeMonotonicity', { regulation: regulation });
	}
	function dispatchToggleObservable(regulation: Regulation) {
		dispatch('toggleObservable', { regulation: regulation });
	}
	function dispatchRenameVariable() {
		dispatch('renameVariable', { newName: variable.name });
	}
	function handleFunctionChange(event: Event) {
		dispatch('changeFunction', { function: (event.target as HTMLInputElement).value, variable });
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
			const modelFragment = exportAeonFragment(regulations, variable)
			const valid = check_update_function(modelFragment);
			fnValidityText = `Possible instantiations: ${valid.cardinality}`;
			functionValid = true;
		} catch (e) {
			functionValid = false;
			fnValidityText = `Invalid function: ${e}`;
		}
	}

	onMount(() => {
		focusedInputStore.subscribe((focusedInput) => {
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
			bind:value={variable.name}
			bind:this={variableNameInput}
			placeholder={variable.name}
			style="font-size: 18px;"
			spellcheck="false"
			autocorrect="off"
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
		class="invisible-input full-line variable-function"		
		style="font-size: 16px; text-align: center;"
		bind:this={updateFunctionInput}
		value={variable.updateFunction}
		on:blur={handleFunctionChange}
	/>
	<div class="variable-function-status" class:red={!functionValid}>
		{fnValidityText}
	</div>
</div>
<style>
	.invisible-input {
		border: none;
		background-color: transparent;
	}
</style>
