<script lang="ts">
	import { decisionStore } from '$lib/stores/decisionStore';
	import BehaviorTable from './BehaviorTable.svelte';
</script>

<div id="decision-info" class="main-panel fira-mono">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Decision</span><br />
		<span id="decision-attribute" style="font-size: 30px;">{$decisionStore?.attribute_name}</span>
	</div>

	<span
		id="decision-phenotype-label"
		style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
		>Phenotypes ({$decisionStore?.classes?.length}):</span
	>

	<BehaviorTable classes={$decisionStore?.classes} cardinality={$decisionStore?.cardinality ?? 0} />

	<div style="text-align: right; margin-bottom: 16px; margin-right: 8px; margin-top: 16px;">
		<button
			id="decision-stability-analysis-button"
			class="image-button"
			style="float: right; margin-bottom: 16px; margin-right: 16px;"
			>Stability analysis (S) <img src="img/stability_analysis-24px.svg" /></button
		>
		<select id="decision-stability-dropdown" class="stability-dropdown" style="float: right;">
			<option value="total">Total</option>
			<option value="S">Stability</option>
			<option value="O">Oscillation</option>
			<option value="D">Disorder</option>
		</select>
	</div>
	<div id="decision-stability-analysis" class="stability-panel" />
</div>
