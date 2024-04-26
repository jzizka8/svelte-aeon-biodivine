<script lang="ts">
	import type { ModelStatistics } from '$lib/types/types';
	export let modelStats: ModelStatistics;
</script>

<table id="model-stats">
	<tr class="row">
		<td>Variables: </td>
		<td class="value">{modelStats.variableCount}</td>
		<td>Parameter space size: </td>
		<td class="value">{modelStats.parameterSpace}</td>
	</tr>
	<tr class="row">
		<td>Regulations: </td>
		<td class="value">{modelStats.regulationCount}</td>
		<td>State space size: </td>
		<td class="value">{modelStats.stateSpace}</td>
	</tr>
	<tr class="row">
		<td>Max. in-degree: </td>
		<td class="value">{modelStats.maxInDegree} </td>
		<td>Max. out-degree:  </td>
		<td class="value">{modelStats.maxOutDegree}</td>
	</tr>
	<tr class="row">
		<td colspan="2">Explicit parameters: </td>
		<td colspan="2">{modelStats.explicitParameters}</td>
	</tr>
</table>
