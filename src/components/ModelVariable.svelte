<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Regulation, Variable } from '../types/types';
	import { regulationShortcut } from '$lib/utils/utils';
	import { cytoscapeStore } from '../stores/cytoscapeStore';
	import { hoveredNodeStore } from '../stores/hoveredNodeStore';
	import { focusedInputStore } from '../stores/focusedVariableInput';
	import { selectedNodesStore } from '../stores/selectedItemsStore';

	export let variable: Variable;
	export let regulations: Regulation[];
	export let isSelected = false;

	$: isHover = $hoveredNodeStore === variable.id;
	let updateFunctionInput: HTMLDivElement;
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

	function handleMouseEnter() {
		hoveredNodeStore.set(variable.id);
		$cytoscapeStore?.$id(variable.id)?.addClass('hover');
	}
	function handleMouseLeave() {
		hoveredNodeStore.set(null);
		$cytoscapeStore?.$id(variable.id)?.removeClass('hover');
	}

	onMount(() =>
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
		})
	);
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
	<button class="remove-variable-button" on:click={dispatchDelete}>
		<img alt="Remove variable" src="img/delete-24px.svg" class="model-variable-remove button" />
	</button>
	<img alt="Show variable" src="img/search-24px.svg" class="model-variable-show button" />
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
	<div
		class="invisible-input full-line variable-function"
		contenteditable
		data-placeholder={`$f_${variable.name}(...)`}
		spellcheck="false"
		autocorrect="off"
		style="font-size: 16px; text-align: center;"
		bind:this={updateFunctionInput}
	>
		{variable.updateFunction}
	</div>
	<div class="variable-function-status">
		<!-- TODO: validate the function and display status  -->
	</div>
</div>
