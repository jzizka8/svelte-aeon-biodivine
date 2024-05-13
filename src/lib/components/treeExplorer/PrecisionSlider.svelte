<script lang="ts">
	import { cytoscapeTreeStore } from '$lib/stores/cytoscapeTreeStore';
	import { setPrecision } from '$lib/treeCytoscape';


	$: precision = 10000;

	function handlePrecisionChange(event: Event) {
		if ($cytoscapeTreeStore) {
			setPrecision($cytoscapeTreeStore, precision);
		}
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
