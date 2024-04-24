<script lang="ts">
	import BehaviorTable from './BehaviorTable.svelte';

	import { calcDimPercent, calcPercent } from '$lib/utils/mathUtils';
	import { onDestroy } from 'svelte';
	import StabilityAnalysis from './StabilityAnalysis.svelte';
	import { leafDataStore, selectedTreeNodeId } from '$lib/stores/treeNodeStores';

	let percent: number, dimPercent: number;
	
	selectedTreeNodeId.subscribe(() => {
		if ($leafDataStore) {
			[percent, dimPercent] = [
				calcPercent($leafDataStore.cardinality, $leafDataStore.totalCardinality),
				calcDimPercent($leafDataStore.cardinality, $leafDataStore.totalCardinality)
			];
		} else {
			[percent, dimPercent] = [0, 0];
		}
	});

	$: witnessCount = `${$leafDataStore?.cardinality} (${percent}% / ${dimPercent}٪)`;

	onDestroy(() => {
		console.log('LeafTab destroyed');
		leafDataStore.set(undefined);
		// TODO: unselect the node in cytoscape
	});
</script>

<div id="leaf-info" class="main-panel fira-mono">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Phenotype</span><br />
		<span class="symbols" id="leaf-phenotype" style="font-size: 50px;"
			>{$leafDataStore?.behavior}</span
		>
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
	<BehaviorTable
		classes={$leafDataStore?.all_classes}
		cardinality={$leafDataStore?.cardinality ?? 0}
	/>
	<span style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;">
		Necessary conditions:
	</span>

	<div id="leaf-necessary-conditions">
		{#if $leafDataStore}
			{#each $leafDataStore?.conditions as condition, i}
				<div class={condition.isPositive ? 'green' : 'red'}>{condition.attribute}</div>
			{/each}
		{/if}
	</div>

	{#if $leafDataStore}
		<StabilityAnalysis id={$leafDataStore.id} />
	{/if}
</div>
