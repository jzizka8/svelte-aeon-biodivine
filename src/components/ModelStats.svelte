<script lang="ts">
	import type { ModelStatistics } from '../types/types';
	export let modelStats: ModelStatistics;
</script>

<table id="model-stats">
	<tr class="row">
		<td>Variables: {modelStats.variableCount}</td>
		<td class="value">-</td>
		<td>Parameter space size: </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td>Regulations:{modelStats.regulationCount} </td>
		<td class="value">-</td>
		<td>State space size: </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td>Max. in-degree: {modelStats.maxInDegree} </td>
		<td class="value">-</td>
		<td>Max. out-degree: {modelStats.maxOutDegree} </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td colspan="2">Explicit parameters: </td>
		<td colspan="2">(none)</td>
	</tr>
</table>
