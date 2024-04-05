<script lang="ts">
	import BehaviorTable from './BehaviorTable.svelte';

	import { leafDataStore } from '$lib/stores/leafDataStore';
	import StabilityAnalysisButton from './StabilityAnalysisButton.svelte';
	import { calcDimPercent, calcPercent } from '$lib/utils/mathUtils';
	import { onDestroy } from 'svelte';

	$: leafData = $leafDataStore ?? {
		treeData: { phenotype: '', cardinality: 0 },
		totalCardinality: 0,
		conditions: []
	};
	$: treeData = leafData.treeData;
	$: dimPercent = treeData ? calcDimPercent(treeData.cardinality, leafData.totalCardinality) : 0;
	$: percent = treeData ? calcPercent(treeData.cardinality, leafData.totalCardinality) : 0;
	$: witnessCount = `${treeData.cardinality} (${percent}% / ${dimPercent}٪)`;

	onDestroy(() => {
		console.log('LeafTab destroyed');
		// TODO: unselect the node in cytoscape
	});
</script>

<div id="leaf-info" class="main-panel fira-mono">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Phenotype</span><br />
		<span class="symbols" id="leaf-phenotype" style="font-size: 50px;">{leafData?.label}</span>
	</div>
	<div>
		<span style="float: left;">
			Witness count:
			<span id="leaf-witness-count">{witnessCount}</span>
		</span>
		<span class="inline-button" onclick="openTreeWitness();" style="float: right;">Witness</span>
		<div style="clear: both;" />
		<span class="inline-button" onclick="openTreeAttractor();" style="float: right;">Attractor</span
		>
	</div>
	<BehaviorTable classes={treeData?.all_classes} cardinality={leafData?.totalCardinality} />
	<span style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;">
		Necessary conditions:
	</span>

	<div id="leaf-necessary-conditions">
		{#each leafData?.conditions as condition, i}
			<div class={condition.isPositive ? 'green' : 'red'}>{condition.attribute}</div>
		{/each}
	</div>

	<div style="text-align: right; margin-bottom: 16px; margin-right: 8px; margin-top: 16px;">
		<StabilityAnalysisButton />
		<select id="leaf-stability-dropdown" class="stability-dropdown" style="float: right;">
			<option value="total">Total</option>
			<option value="S">Stability</option>
			<option value="O">Oscillation</option>
			<option value="D">Disorder</option>
		</select>
	</div>
	<div id="leaf-stability-analysis" class="stability-panel" />
</div>
