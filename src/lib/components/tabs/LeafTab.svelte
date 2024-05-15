<script lang="ts">
	import BehaviorTable from '$lib/components/BehaviorTable.svelte';

	import { calcDimPercent, calcPercent } from '$lib/utils/mathUtils';
	import { onDestroy } from 'svelte';
	import StabilityAnalysis from '../treeExplorer/StabilityAnalysis.svelte';
	import { leafDataStore, selectedTreeNodeId } from '$lib/stores/treeNodeStores';
	import { treeCytoscapeManager } from '$lib/treeCytoscape/treeCytoscapeManager';

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
		treeCytoscapeManager.unselectNode($leafDataStore?.id)
		leafDataStore.set(undefined);
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
	</div>
	<BehaviorTable
		classes={$leafDataStore?.all_classes}
		cardinality={$leafDataStore?.cardinality ?? 0}
	/>
	<h2 style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;">
		Necessary conditions:
	</h2>

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
