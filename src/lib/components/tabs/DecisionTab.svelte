<script lang="ts">
	import { decisionStore } from '$lib/stores/treeNodeStores';
	import { onDestroy, onMount } from 'svelte';
	import BehaviorTable from '$lib/components/BehaviorTable.svelte';
	import StabilityAnalysis from '../treeExplorer/StabilityAnalysis.svelte';
	import hotkeys from 'hotkeys-js';
	import { undecideSubtree } from '$lib/treeCytoscape/';
	import { treeCytoscapeManager } from '$lib/treeCytoscape/treeCytoscapeManager';

	onMount(() => {
		hotkeys('backspace', handleUndecide);
	});

	onDestroy(() => {
		hotkeys.unbind('backspace');
		treeCytoscapeManager.unselectNode($decisionStore?.id);
		decisionStore.set(undefined);
	});

	function handleUndecide() {
		if ($decisionStore) {
			undecideSubtree($decisionStore?.id);
		}
	}
</script>

<div id="decision-info" class="main-panel fira-mono">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Decision</span><br />
		<span id="decision-attribute" style="font-size: 30px;">{$decisionStore?.attribute_name}</span>
	</div>
	<div class="flex">
		<div
			id="decision-phenotype-label"
			style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
		>
			Phenotypes ({$decisionStore?.classes?.length}):
		</div>
		<button class="image-button btn-remove" on:click={handleUndecide}>
			Undecide (⌫)
			<img src="img/close-24px.svg" alt="" />
		</button>
	</div>

	{#if $decisionStore}
		<BehaviorTable classes={$decisionStore.classes} cardinality={$decisionStore.cardinality} />

		<StabilityAnalysis id={$decisionStore.id} />
	{/if}
</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
	}
	.btn-remove {
		background-color: var(--primary-color-light);
	}
	.btn-remove:hover {
		background-color: var(--primary-color);
	}
</style>
