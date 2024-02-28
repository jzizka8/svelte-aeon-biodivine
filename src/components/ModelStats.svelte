<script lang="ts">
	import { modelStore } from '../stores/modelStore';
	import { calculateMaxDegrees } from '$lib/utils/modelStats';

	$: [maxIn, maxOut] = calculateMaxDegrees($modelStore.regulations);
</script>

<table id="model-stats">
	<tr class="row">
		<td>Variables: {$modelStore.variables.length}</td>
		<td class="value">-</td>
		<td>Parameter space size: </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td>Regulations:{$modelStore.regulations.length} </td>
		<td class="value">-</td>
		<td>State space size: </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td>Max. in-degree: {maxIn} </td>
		<td class="value">-</td>
		<td>Max. out-degree: {maxOut} </td>
		<td class="value">-</td>
	</tr>
	<tr class="row">
		<td colspan="2">Explicit parameters: </td>
		<td colspan="2">(none)</td>
	</tr>
</table>
