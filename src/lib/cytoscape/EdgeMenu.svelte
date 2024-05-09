<script lang="ts">
	import { nextMonotonicity } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	import { cytoscapeStore } from '$lib/stores/cytoscapeStore';
	import { modelStoreActions } from '$lib/stores/modelStore';
	import { selectedEdgesStore } from '$lib/stores/selectedItemsStore';
	import { EdgeMonotonicity, type Regulation } from '$lib/types/types';
	import hotkeys from 'hotkeys-js';
	import { writable, type Writable } from 'svelte/store';
	import { hintAction } from '$lib/actions/hintAction';

	$: edges = $selectedEdgesStore?.items;
	$: position = $selectedEdgesStore?.position;
	$: regulation = edges[0];
	const hint = writable('');

	$: [imgMonotonicitySrc, imgMonotonicityText] = (() => {
		switch (regulation?.monotonicity) {
			case EdgeMonotonicity.activation:
				return ['img/trending_down-24px.svg', 'Make inhibiting (M)'];
			case EdgeMonotonicity.inhibition:
				return ['img/swap_vert-24px.svg', 'Monotonicity off (M)'];
			default:
				return ['img/trending_up-24px.svg', 'Make activating (M)'];
		}
	})();
	$: [imgObservabilitySrc, imgObservabilityText] = regulation?.observable
		? ['img/visibility_off-24px.svg', 'Make unobservable (O)']
		: ['img/visibility_on-24px.svg', 'Make observable (O)'];

	$: menuStyle = edges && position ? `top: ${position.y + 15}px; left: ${position.x + 60}px;` : '';

	function handleMonotonicityChange() {
		const newMonotonicity = nextMonotonicity(regulation.monotonicity);

		modelStoreActions.changeMonotonicity(regulation.id, newMonotonicity);

		// this is only needed for this menu
		regulation.monotonicity = newMonotonicity;
	}

	function handleObservableToggle() {
		modelStoreActions.toggleObservable(regulation.id);

		// this is only needed for this menu
		regulation.observable = !regulation.observable;
	}
	function handleRemove() {
		if (edges) {
			edges.forEach((edge) => {
				console.log('edge.id', edge.id);
				modelStoreActions.removeRegulation(edge.id);
			});
		}
	}
	onMount(() => {
		hotkeys('m', function (event, handler) {
			if (edges.length != 1) return;
			event.preventDefault();
			handleMonotonicityChange();
		});
		hotkeys('o', function (event, handler) {
			if (edges.length != 1) return;
			event.preventDefault();
			handleObservableToggle();
		});
		hotkeys('backspace', { keyup: true, keydown: true }, function (event, handler) {
			if (!edges.length) return;
			event.preventDefault();
			handleRemove();
		});
	});
</script>

{#if edges.length > 0}
	<div id="edge-menu" class="float-menu" style={menuStyle}>
		<div class="button-row">
			{#if edges.length === 1}
				<button
					use:hintAction={{ hint, hintText: imgMonotonicityText }}
					on:click={handleMonotonicityChange}
				>
					<img src={imgMonotonicitySrc} alt={imgMonotonicityText} />
				</button>
				<button
					use:hintAction={{ hint, hintText: imgObservabilityText }}
					on:click={handleObservableToggle}
				>
					<img src={imgObservabilitySrc} alt={imgObservabilityText} />
				</button>
			{/if}
			<button use:hintAction={{ hint, hintText: 'Remove (⌫)' }} on:click={handleRemove}>
				<img alt="Remove (⌫)" id="edge-menu-remove" class="button" src="img/delete-24px.svg" />
			</button>
		</div>
		{#if $hint}
			<div class="hint">{$hint}</div>
		{/if}
	</div>
{/if}
