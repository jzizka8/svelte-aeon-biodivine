<script lang="ts">
	import { decisionStore } from '$lib/stores/decisionStore';
	import BehaviorTable from './BehaviorTable.svelte';
	import StabilityAnalysis from './StabilityAnalysis.svelte';
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

	{#if $decisionStore}
		<BehaviorTable classes={$decisionStore.classes} cardinality={$decisionStore.cardinality} />

		<StabilityAnalysis id={$decisionStore.id} />
	{/if}
</div>
