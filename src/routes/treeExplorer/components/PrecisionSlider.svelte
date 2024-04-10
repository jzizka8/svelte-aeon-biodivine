<script lang="ts">
	import { computeEngineStore } from '$lib/stores/ComputeEngineStore';
	import { onMount } from 'svelte';
	import { setPrecision } from '../../../script/treeExplorerMain';

	onMount(() => {
		$computeEngineStore.getTreePrecision((e, r) => {
			precision = r;
		});
	});

	let precision: number;

	function handlePrecisionChange(event: Event) {
		setPrecision(precision);
	}
</script>

<div id="precision">
	<input
		type="range"
		min="5025"
		max="10000"
		bind:value={precision}
		step="25"
		class="seekbar"
		id="precision-slider"
		on:change={handlePrecisionChange}
	/>
	Precision: <span id="precision-value">{precision / 100}%</span>
</div>
