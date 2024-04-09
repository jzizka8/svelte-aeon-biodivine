<script lang="ts">
	import { autoExpandBifurcationTree } from '../../../script/treeExplorerMain';
	import { sortOptions } from '$lib/const';
	import { mixedDataStore, selectedTreeNodeId } from '$lib/stores/treeNodeStores';
	import BehaviorTable from './BehaviorTable.svelte';
	import StabilityAnalysis from './StabilityAnalysis.svelte';
	import { computeEngineStore } from '$lib/stores/ComputeEngineStore';
	import type { DecisionAttribute } from '$lib/types/treeExplorerTypes';
	import DecisionAttributePanel from './DecisionAttributePanel.svelte';
	import { compareCardinality } from '$lib/utils/comparators';
	import { onDestroy, } from 'svelte';

	function handleAutoExpand() {
		autoExpandBifurcationTree($mixedDataStore?.id, depthValue);
	}

	let depthValue = 1;
	$: autoExpandText =
		depthValue == 1 ? `Auto expand (${depthValue} level)` : `Auto expand (${depthValue} levels)`;

	$: decisionsMade = false;
	$: comparator = sortOptions[0].comparator;

	selectedTreeNodeId.subscribe(() => {
		decisionsMade = false;
		comparator = sortOptions[0].comparator;
	});

	$: decisionAttributes = $mixedDataStore?.attributes
		? [...$mixedDataStore.attributes].sort(comparator)
		: [];

	function handleMakeDecision() {
		decisionsMade = true;
		console.log('Making decision...');
		if ($mixedDataStore?.attributes) {
			console.log('already have decision attributes');
			return;
		}
		console.log('Getting decision attributes...');
		$computeEngineStore.getDecisionAttributes(
			$mixedDataStore?.id,
			(e: string, r: DecisionAttribute[]) => {
				if (e) {
					console.error('Error fetching decision attributes:', e);
					return;
				}
				for (let attr of r) {
					// Prepare data:
					attr.left.sort(compareCardinality);
					attr.right.sort(compareCardinality);
					attr.leftTotal = attr.left.reduce((a, b) => a + b.cardinality, 0.0);
					attr.rightTotal = attr.right.reduce((a, b) => a + b.cardinality, 0.0);
				}
				console.log('finished fetching, N:', r.length);
				mixedDataStore.update((d) => {
					if (d) d.attributes = r;
					return d;
				});
				console.log('updated mixedDataStore');
			}
		);
	}

	onDestroy(() => {
		mixedDataStore.set(undefined);
	});
</script>

<div id="mixed-info" class="main-panel fira-mono">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Mixed</span><br />
		<span id="mixed-type-label" style="font-size: 30px;"
			>{$mixedDataStore?.classes?.length} Phenotypes</span
		>
	</div>
	<BehaviorTable
		classes={$mixedDataStore?.classes}
		cardinality={$mixedDataStore?.cardinality ?? 0}
	/>

	<div id="auto-expand" style="clear: both; text-align: right; padding-right: 16px;">
		<button
			id="button-auto-expand"
			class="image-button"
			style="margin-bottom: 16px; margin-right: 16px;"
			on:click={handleAutoExpand}
		>
			{autoExpandText}
			<img src="img/graph-24px.svg" />
		</button>
		Depth:
		<input
			type="range"
			min="1"
			max="10"
			bind:value={depthValue}
			class="seekbar"
			id="auto-expand-slider"
			style="width: 100px; position: relative; top: 8px;"
		/>
	</div>

	<StabilityAnalysis id={$mixedDataStore?.id ?? 0} />
	<div style="clear: both;">
		<button
			id="button-add-variable"
			class="image-button"
			class:hidden={decisionsMade}
			style="float: right; margin-bottom: 16px; margin-right: 16px;"
			on:click={handleMakeDecision}
		>
			Make decision (D) <img src="img/add_box-24px.svg" />
		</button>
	</div>
	{#if decisionAttributes && decisionsMade}
		<div id="mixed-attributes">
			<span
				id="mixed-attributes-title"
				style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
				>Attributes: {decisionAttributes.length}</span
			>

			<div>
				<b>Sort by:</b>
				<div class="sort-options-container">
					{#each sortOptions as option}
						<label class="sort-checkbox">
							<input type="radio" name="sort" bind:group={comparator} value={option.comparator} />
							{option.label}
						</label>
					{/each}
				</div>
			</div>

			<div id="mixed-attributes-list">
				{#each decisionAttributes as decission (decission.id)}
					<DecisionAttributePanel decision={decission} parrentId={$mixedDataStore.id} />
				{/each}
			</div>

			<span style="font-size: 14px; display: block; width: 100%; text-align: right;"
				>٪ = log-percentage</span
			>
			<span style="font-size: 14px; display: block; width: 100%; text-align: right;"
				>ɪɢ = information gain</span
			>
			<span style="font-size: 14px; display: block; width: 100%; text-align: right;"
				>ᴛᴄ = total class count</span
			>
		</div>
	{/if}
</div>

<style>
	.sort-options-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0 10px;
	}
</style>
