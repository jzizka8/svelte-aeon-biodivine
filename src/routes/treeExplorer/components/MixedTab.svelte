<script lang="ts">
	import { autoExpandBifurcationTree, setSort } from '../../../script/treeExplorerMain';
	import { sortOptions } from '$lib//const';
	import { mixedDataStore } from '$lib/stores/decisionStore';
	import BehaviorTable from './BehaviorTable.svelte';

	function handleAutoExpand() {
		autoExpandBifurcationTree($mixedDataStore?.id, depthValue);
	}

	let depthValue = 1;
	$: autoExpandText =
		depthValue == 1 ? `Auto expand (${depthValue} level)` : `Auto expand (${depthValue} levels)`;
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

	<div id="mixed-attributes-list-item-template" class="attribute-panel gone">
		<div style="float: left;" class="information-gain">0.43 ɪɢ / 4 ᴛᴄ</div>
		<div style="float: right;" class="attribute-name">ATTr_Name</div>
		<div style="clear: both;" />
		<div class="attribute-sub-panel negative">
			<span class="title">Negative</span>
			<table class="table collapsed">
				<tr>
					<td class="distribution">99%</td>
					<td class="symbols phenotype">SSSSSSSSSSSSSSSSSD</td>
				</tr>
			</table>
		</div>
		<div class="attribute-sub-panel positive">
			<span class="title">Positive</span>
			<table class="table collapsed">
				<tr>
					<td class="symbols phenotype">SSSSSSSSSSSSSSSSSD</td>
					<td class="distribution">99%</td>
				</tr>
			</table>
		</div>
		<div style="clear: both;" />
		<div class="expand-button">more...</div>
	</div>

	<div>
		<button
			id="mixed-stability-analysis-button"
			class="image-button"
			style="float: right; margin-bottom: 16px; margin-right: 16px;"
		>
			Stability analysis (S) <img src="img/stability_analysis-24px.svg" />
		</button>
		<select id="mixed-stability-dropdown" class="stability-dropdown" style="float: right;">
			<option value="total">Total</option>
			<option value="S">Stability</option>
			<option value="O">Oscillation</option>
			<option value="D">Disorder</option>
		</select>
	</div>

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
	<div style="clear: both;">
		<button
			id="button-add-variable"
			class="image-button"
			style="float: right; margin-bottom: 16px; margin-right: 16px;"
		>
			Make decision (D) <img src="img/add_box-24px.svg" />
		</button>
	</div>

	<div id="mixed-stability-analysis" class="stability-panel" />
	<div id="mixed-attributes" class="gone">
		<span
			id="mixed-attributes-title"
			style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
			>Attributes:</span
		>

		<div>
			<b>Sort by:</b>
			<div class="sort-options-container">
				{#each sortOptions as option}
					<label class="sort-checkbox">
						<input
							type="radio"
							name="sort"
							value={option.id}
							checked={option.id === sortOptions[0].id}
							id={option.id}
							on:change={setSort}
						/>
						{option.label}
					</label>
				{/each}
			</div>
		</div>

		<div id="mixed-attributes-list" />

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
</div>

<style>
	.sort-options-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0 10px;
	}
</style>
