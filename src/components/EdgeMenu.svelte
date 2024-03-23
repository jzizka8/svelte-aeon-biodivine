<script lang="ts">
	import { nextMonotonicity } from '$lib/utils/utils';
	import { cytoscapeStore } from '../stores/cytoscapeStore';
	import { modelStoreActions } from '../stores/modelStore';
	import { selectedEdgesStore } from '../stores/selectedItemsStore';
	import { EdgeMonotonicity, type Regulation } from '../types/types';

	$: edges = $selectedEdgesStore?.items;
	$: position = $selectedEdgesStore?.position;
	$: regulation = edges[0];

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

	$: menuStyle = edges && position ? `top: ${position.y + 15}px; left: ${position.x + 120}px;` : '';
	let hint: string = 'dasdsdasddasdsadsa';

	function hintAction(node: HTMLButtonElement, hintText: string) {
		const setHint = () => {
			// Your implementation to set the hint text
			hint = hintText;
		};

		node.addEventListener('mouseover', setHint);
		node.addEventListener('focus', setHint);
		node.addEventListener('mouseout', () => {
			hint = '';
		});

		return {
			destroy() {
				node.removeEventListener('mouseover', setHint);
				node.removeEventListener('focus', setHint);
			}
		};
	}
	function handleMonotonicityChange() {
		const newMonotonicity = nextMonotonicity(regulation.monotonicity);
		
		modelStoreActions.changeMonotonicity(regulation.id, newMonotonicity);
		cytoscapeStore.updateEdgeMonotonicity(regulation.id, newMonotonicity);
		
		// this is only needed for this menu
		regulation.monotonicity = newMonotonicity;
	}

	function handleObservableToggle() {
		modelStoreActions.toggleObservable(regulation.id);
		cytoscapeStore.updateEdgeObservable(regulation.id, !regulation.observable);
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
</script>

{#if edges.length > 0}
	<div id="edge-menu" class="float-menu" style={menuStyle}>
		<div class="button-row">
			{#if edges.length === 1}
				<button use:hintAction={imgMonotonicityText} on:click={handleMonotonicityChange}>
					<img src={imgMonotonicitySrc} alt={imgMonotonicityText} />
				</button>
				<button use:hintAction={imgObservabilityText} on:click={handleObservableToggle}>
					<img src={imgObservabilitySrc} alt={imgObservabilityText} />
				</button>
			{/if}
			<button use:hintAction={'Remove (⌫)'} on:click={handleRemove}>
				<img alt="Remove (⌫)" id="edge-menu-remove" class="button" src="img/delete-24px.svg" />
			</button>
		</div>
		{#if hint}
			<div class="hint">{hint}</div>
		{/if}
	</div>
{/if}
