<script lang="ts">
	import { resultsStore } from '$lib/stores/resultsStore';
	import { compareCardinality } from '$lib/utils/comparators';
	import BehaviorTable from '../BehaviorTable.svelte';

	$: classes = $resultsStore ? $resultsStore.data?.sort(compareCardinality) : null;

	$: cardinality = classes?.reduce((acc, cls) => acc + cls.cardinality, 0);
</script>

<div id="tab-results" class="main-panel">
	<slot />
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		Bifurcation Function
	</h2>
	{#if $resultsStore && classes && cardinality}
		{#if !$resultsStore?.is_finished}
			<h3>These results are only partial!</h3>
			<p>Progress: {$resultsStore.progress}</p>
		{/if}
		<p class="center">Total number of classes: {classes.length}</p>
		<p class="center">Time elapsed: {($resultsStore.elapsed / 1000).toFixed(3)}&nbsp;s</p>
		<BehaviorTable {classes} {cardinality} />
		{#if $resultsStore?.is_finished}
			<div id="open-tree-explorer" style="text-align: center; margin: 8px;">
				<a href="./treeExplorer" target="_blank" class="inline-button">
					&gt;&gt; Explore Bifurcation Function &lt;&lt;
				</a>
			</div>
		{/if}
	{:else if $resultsStore?.error}
		<p class="red">Error: {$resultsStore.error}</p>
	{:else}
		<p>No results available, run analysis first</p>
	{/if}
	<div id="result-legend">
		<span class="table-behavior">D</span> disorder |
		<span class="table-behavior">O</span> oscillation |
		<span class="table-behavior">S</span> stability
	</div>
</div>
