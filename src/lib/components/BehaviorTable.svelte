<script lang="ts">
	import { calcDimPercent, calcPercent } from '$lib/utils/mathUtils';
	import { normalizeClass } from '$lib/utils/utils';
	import type { CardinalityClass } from '$lib/types/treeExplorerTypes';

	export let classes: CardinalityClass[] | undefined;
	export let cardinality: number;
</script>

{#if classes}
	<table id="leaf-behavior-table" class="behavior-table">
		<tr><td colspan="3">All phenotypes:</td></tr>
		<tr class="behavior-table-header">
			<td class="cell-behavior">Behavior</td>
			<td class="cell-witness-count">Witness Count</td>
			<td class="cell-distribution">Distribution</td>
		</tr>
		{#each classes as cls}
			<tr class="behavior-table-row">
				<td class="cell-behavior symbols">{normalizeClass(cls.class)}</td>
				<td class="cell-witness-count">
					{cls.cardinality > 1000 ? cls.cardinality.toExponential() : cls.cardinality}
				</td>
				<td class="cell-distribution">
					{calcPercent(cls.cardinality, cardinality)}% /
					{calcDimPercent(cls.cardinality, cardinality)}٪
				</td>
			</tr>
		{/each}
	</table>
{/if}
