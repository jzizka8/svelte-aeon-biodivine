<div id="leaf-info" class="main-panel fira-mono gone">
	<slot />
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Phenotype</span><br />
		<span class="symbols" id="leaf-phenotype" style="font-size: 50px;">DDS</span>
	</div>
	<div>
		<span style="float: left;">Witness count: <span id="leaf-witness-count">12345</span></span>
		<span class="inline-button" onclick="openTreeWitness();" style="float: right;">Witness</span>
		<div style="clear: both;" />
		<span class="inline-button" onclick="openTreeAttractor();" style="float: right;">Attractor</span
		>
	</div>

	<table id="leaf-behavior-table" class="behavior-table gone" style="margin-top: 16px;">
		<tr><td colspan="3">All phenotypes:</td></tr>
		<tr class="behavior-table-header">
			<td class="cell-behavior">Behavior</td>
			<td class="cell-witness-count">Witness Count</td>
			<td class="cell-distribution">Distribution</td>
		</tr>
		<tr class="empty-space"><td /></tr>
	</table>

	<span style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
		>Necessary conditions:</span
	>

	<div id="leaf-necessary-conditions">Lorem Ipsum</div>

	<div style="text-align: right; margin-bottom: 16px; margin-right: 8px; margin-top: 16px;">
		<button
			id="leaf-stability-analysis-button"
			class="image-button"
			style="float: right; margin-bottom: 16px; margin-right: 16px;"
			>Stability analysis (S) <img src="img/stability_analysis-24px.svg" /></button
		>
		<select id="leaf-stability-dropdown" class="stability-dropdown" style="float: right;">
			<option value="total">Total</option>
			<option value="S">Stability</option>
			<option value="O">Oscillation</option>
			<option value="D">Disorder</option>
		</select>
	</div>
	<div id="leaf-stability-analysis" class="stability-panel" />
</div>
