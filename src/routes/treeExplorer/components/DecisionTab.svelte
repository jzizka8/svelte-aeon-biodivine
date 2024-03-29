<div id="decision-info" class="main-panel fira-mono gone">
	<div class="center" style="margin: 16px;">
		<span style="position: relative; top: -20px; font-size: 14px;">Decision</span><br />
		<span id="decision-attribute" style="font-size: 30px;">Lorem_Ipsum</span>
	</div>

	<span
		id="decision-phenotype-label"
		style="font-weight: bold; margin-top: 16px; display: inline-block; margin-bottom: 8px;"
		>Phenotypes (X):</span
	>

	<table id="decision-behavior-table" class="behavior-table">
		<tr id="behavior-table-row-template" class="gone">
			<td class="cell-behavior symbols">S O</td>
			<td class="cell-witness-count">1234</td>
			<td class="cell-distribution">24% / 14٪</td>
		</tr>
		<tr class="behavior-table-header">
			<td class="cell-behavior">Behavior</td>
			<td class="cell-witness-count">Witness Count</td>
			<td class="cell-distribution">Distribution</td>
		</tr>
		<tr class="empty-space"><td /></tr>
	</table>

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
