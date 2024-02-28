<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Regulation, Variable } from '../types/types';
	import { regulationShortcut } from '$lib/utils/utils';

	export let variable: Variable;
	export let regulations: Regulation[];

	const dispatch = createEventDispatcher();
	function dispatchDelete() {
		dispatch('delete', { variable });
	}
	function dispatchMonotonicity(regulation: Regulation) {
		dispatch('changeMonotonicity', { id: regulation.id, current: regulation.monotonicity })
	}
	function toggleObservability(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const observable = target.classList.contains('observable--true');
		target.classList.toggle('observable--true');
		target.classList.toggle('observable--false');
		target.textContent = observable ? 'non-observable' : 'observable';
	}
</script>

<div class="model-variable">
	<div class="invisible-input">
		<input
			class="variable-name"
			type="text"
			name="variable-name"
			value={variable.name}
			placeholder={variable.name}
			style="font-size: 18px;"
			spellcheck="false"
			autocorrect="off"
		/>
	</div>
	<button on:click={dispatchDelete}>
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
					on:click={() => dispatch('toggleObservability', { id: regulation.id })}
				>
					{regulation.observable ? 'observable' : 'non-observable'}
				</button>
				<button
					on:click={() => dispatchMonotonicity(regulation)}
					class={`model-regulation-monotonicity monotonicity--${regulation.monotonicity}`}
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
	>
		{variable.updateFunction}
	</div>
	<div class="variable-function-status" />
</div>
