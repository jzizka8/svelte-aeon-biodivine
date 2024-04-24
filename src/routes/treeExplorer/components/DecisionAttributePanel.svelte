<script lang="ts">
	import type { DecisionAttribute } from '$lib/types/treeExplorerTypes';
	import { calcPercent } from '$lib/utils/mathUtils';
	import { normalizeClass } from '$lib/utils/utils';
	import { cytoscapeTreeStore } from '$lib/stores/cytoscapeTreeStore';
	import { selectAttribute } from '$lib/treeCytoscape';

	export let parrentId: number;
	export let decision: DecisionAttribute;

	const negativeLength = decision.left.length;
	const positiveLength = decision.right.length;

	const negativePercentage = calcPercent(
		decision.leftTotal,
		decision.leftTotal + decision.rightTotal
	);
	const positivePercentage = calcPercent(
		decision.rightTotal,
		decision.leftTotal + decision.rightTotal
	);

	const totalClass = negativeLength + positiveLength;
	const infoGain = decision.gain.toFixed(2);

	let collapsed = true;

	function handleCollapse() {
		collapsed = !collapsed;
	}
	function handleAttributeSelect() {
		if ($cytoscapeTreeStore) {
			selectAttribute($cytoscapeTreeStore, parrentId, decision.id);
		}
	}
	$: collapseButtonText = collapsed ? 'more...' : '...less';
</script>

<div id="" class="attribute-panel">
	<div style="float: left;" class="information-gain primary">{infoGain} ɪɢ / {totalClass} ᴛᴄ</div>
	<div style="float: right;" class="attribute-name">
		<button on:click={handleAttributeSelect}>
			<small class="grey">SELECT:</small>
			{decision.name}
		</button>
	</div>
	<div style="clear: both;" />
	<div class="attribute-sub-panel negative">
		<span class="title">Negative ({negativeLength}|<small>{negativePercentage} %</small>)</span>
		<table class="table" class:collapsed>
			<tbody>
				{#each decision.left as el, i}
					<tr class:extra={i != 0}>
						<td class="distribution">{calcPercent(el.cardinality, decision.leftTotal)} %</td>
						<td class="symbols phenotype">{normalizeClass(el.class)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="attribute-sub-panel positive">
		<span class="title">Positive ({positiveLength}|<small>{positivePercentage} %</small>)</span>
		<table class="table" class:collapsed>
			<tbody>
				{#each decision.right as el, i}
					<tr class:extra={i != 0}>
						<td class="symbols phenotype">{normalizeClass(el.class)}</td>
						<td class="distribution">{calcPercent(el.cardinality, decision.rightTotal)} %</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div style="clear: both;" />
	<button class="expand-button" on:click={handleCollapse}>{collapseButtonText}</button>
</div>
