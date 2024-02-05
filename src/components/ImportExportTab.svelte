<script>
	import Examples from '../script/Examples';
	import UI from '../script/UI';
	import { activeTabStore } from '../stores/activeTabStore';
	import { liveModelStore } from '../stores/liveModelStore';
	$: LiveModel = $liveModelStore;
	function importModel(model) {
		LiveModel.importAeon(model);
		activeTabStore.close();
	}
</script>

<div id="tab-import-export" class="main-panel">
	<slot />
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		Model File
	</h2>

	<div style="width: 244px; display: block; float: left; margin-right: 6px;">
		<h3
			style="display: block; margin: 0 auto; text-align: center; margin-top: 8px; margin-bottom: 8px;"
		>
			Import
		</h3>

		<button
			id="import-local"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			onclick="LiveModel.loadFromLocalStorage();"
			><span class="main">Local<br />Storage</span><span class="desc">Last loaded model</span
			></button
		>

		<label
			for="import-aeon-input"
			id="import-aeon"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			><span class="main">.AEON</span><span class="desc">Simple text format</span></label
		>

		<label
			for="import-sbml-input"
			id="import-sbml"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			><span class="main">.SBML</span><span class="desc">Standard<br />SBML L3</span></label
		>

		<input
			on:change={() => UI.importAeon(this)}
			id="import-aeon-input"
			style="display:none"
			type="file"
		/>
		<input
			on:change={() => UI.importSBML(this)}
			id="import-sbml-input"
			style="display:none"
			type="file"
		/>
	</div>
	<div style="width: 244px; display: inline-block; margin-left: 6px; float: right;">
		<h3
			style="display: block; margin: 0 auto; text-align: center; margin-top: 8px; margin-bottom: 8px;"
		>
			Export
		</h3>

		<button
			id="export-aeon"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			onclick="UI.downloadAeon();"
			><span class="main">.AEON</span><span class="desc">Simple text format</span></button
		>

		<button
			id="export-sbml"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			onclick="UI.downloadSBML();"
			><span class="main">.SBML<br /><small>(parametrized)</small></span><span class="desc"
				>Parametrized model</span
			></button
		>

		<button
			id="export-sbml"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			onclick="UI.downloadSBMLInstantiated();"
			><span class="main">.SBML<br /><small>(instantiated)</small></span><span class="desc"
				>Witness<br />model</span
			></button
		>
	</div>
	<div style="clear: both;" />
	<h3
		style="display: block; margin: 0 auto; text-align: center; margin-top: 8px; margin-bottom: 8px;"
	>
		Example Models
	</h3>

	<button
		id="example-1"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px;"
		on:click={() => importModel(Examples.g2a)}
		><span class="main">G2A</span><span class="desc">Cell<br />Division</span></button
	>
	<button
		id="example-2"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px; float: right;"
		on:click={() => importModel(Examples.g2b)}
		><span class="main">G2B</span><span class="desc">Cell<br />Division</span></button
	>
	<button
		id="example-3"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px;"
		on:click={() => importModel(Examples.buddingYeastOrlando)}
		><span class="main">Orlando</span><span class="desc">Budding<br />Yeast</span></button
	>
	<button
		id="example-4"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px; float: right;"
		on:click={() => importModel(Examples.buddingYeastIrons)}
		><span class="main">Irons</span><span class="desc">Budding<br />Yeast</span></button
	>
	<div style="clear: both;" />
</div>
