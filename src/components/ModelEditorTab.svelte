<script lang="ts">
	import ModelVariable from './ModelVariable.svelte';

	import { liveModelStore } from '../stores/liveModelStore';
	const LiveModel = liveModelStore;
</script>

<div id="tab-model-editor" class="main-panel" style="padding-bottom: 0px;">
	<div class="invisible-input full-line">
		<input
			id="model-name"
			class="center"
			type="text"
			name="model-name"
			placeholder="Untitled model"
			style="font-size: 20px;"
		/>
	</div>
	<slot />
	<div
		class="invisible-input full-line"
		id="model-description"
		contenteditable
		data-placeholder="(model description)"
		style="margin-top: 4px; margin-bottom: 4px;"
	/>

	<div style="height: 30px;">
		<h3 style="font-family: 'FiraMono'; text-transform: uppercase;">● Overview</h3>
	</div>
	<table id="model-stats">
		<tr class="row">
			<td>Variables: </td>
			<td class="value">-</td>
			<td>Parameter space size: </td>
			<td class="value">-</td>
		</tr>
		<tr class="row">
			<td>Regulations: </td>
			<td class="value">-</td>
			<td>State space size: </td>
			<td class="value">-</td>
		</tr>
		<tr class="row">
			<td>Max. in-degree: </td>
			<td class="value">-</td>
			<td>Max. out-degree: </td>
			<td class="value">-</td>
		</tr>
		<tr class="row">
			<td colspan="2">Explicit parameters: </td>
			<td colspan="2">(none)</td>
		</tr>
	</table>
	<div style="height: 40px;">
		<h3 style="float: left; font-family: 'FiraMono'; text-transform: uppercase;">● Variables</h3>
		<button
			id="button-add-variable"
			class="image-button"
			on:click={() => $LiveModel.addVariable()}
			style="float: right;">Add variable (N) <img src="img/add_box-24px.svg" /></button
		>
	</div>
	<div style="clear: both;" />
	<div id="model-variables" class="full-line" />
	<div class="templates gone">
		<ModelVariable />
	</div>
</div>
