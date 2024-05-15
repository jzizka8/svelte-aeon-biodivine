<script lang="ts">
	import {
		importAeon,
		exportAeon,
		downloadFile,
		importSbml,
		exportSbml,
		exportSbmlInstantiated
	} from '$lib/importExport';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import { modelStore } from '$lib/stores/modelStore';
	import { EXAMPLE_MODEL } from '$lib/const/exampleModels';
	import { cytoscapeManager } from '$lib/cytoscape/CytoscapeManager';

	$: modelEmpty = $modelStore.variables.length === 0;

	function downloadAeon() {
		const positions = cytoscapeManager.collectElementPosition();
		const aeonData = exportAeon($modelStore, positions);
		downloadFile(`${$modelStore.name}.aeon`, aeonData);
	}

	function downloadSbml() {
		const positions = cytoscapeManager.collectElementPosition();
		const sbml = exportSbml($modelStore, positions);
		downloadFile(`${$modelStore.name}.sbml`, sbml);
	}

	function downloadSbmlInstantiated() {
		const positions = cytoscapeManager.collectElementPosition();
		const sbml = exportSbmlInstantiated($modelStore, positions);
		downloadFile(`${$modelStore.name}_instantiated.sbml`, sbml);
	}

	function handleAeonFileImport(event: Event) {
		handleFileInputImport(importAeon, event.target as HTMLInputElement);
	}

	function handleSbmlFileImport(event: Event) {
		handleFileInputImport(importSbml, event.target as HTMLInputElement);
	}

	async function handleFileInputImport(
		fileImportFunction: (data: string) => void,
		input: HTMLInputElement
	) {
		if (!(input && input.files && input.files.length > 0)) {
			return;
		}
		const text = await input.files[0].text();
		fileImportFunction(text);
		activeTabStore.close();
	}

	function importModel(model: string) {
		importAeon(model);
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
		<!-- TODO: implement -->
		<button
			id="import-local"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			disabled
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
			on:change={handleAeonFileImport}
			id="import-aeon-input"
			style="display:none"
			type="file"
			accept=".aeon"
		/>
		<input
			on:change={handleSbmlFileImport}
			id="import-sbml-input"
			style="display:none"
			type="file"
			accept=".sbml"
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
			on:click={downloadAeon}
			disabled={modelEmpty}			
			><span class="main">.AEON</span><span class="desc">Simple text format</span></button
		>

		<button
			id="export-sbml"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			on:click={downloadSbml}
			disabled={modelEmpty}			
			><span class="main">.SBML<br /><small>(parametrized)</small></span><span class="desc"
				>Parametrized model</span
			></button
		>

		<button
			id="export-sbml"
			class="compound-button"
			style="margin-top: 8px; margin-bottom: 8px;"
			on:click={downloadSbmlInstantiated}
			disabled={modelEmpty}			
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
		on:click={() => importModel(EXAMPLE_MODEL.g2a)}
		><span class="main">G2A</span><span class="desc">Cell<br />Division</span></button
	>
	<button
		id="example-2"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px; float: right;"
		on:click={() => importModel(EXAMPLE_MODEL.g2b)}
		><span class="main">G2B</span><span class="desc">Cell<br />Division</span></button
	>
	<button
		id="example-3"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px;"
		on:click={() => importModel(EXAMPLE_MODEL.buddingYeastOrlando)}
		><span class="main">Orlando</span><span class="desc">Budding<br />Yeast</span></button
	>
	<button
		id="example-4"
		class="compound-button"
		style="margin-top: 8px; margin-bottom: 8px; float: right;"
		on:click={() => importModel(EXAMPLE_MODEL.buddingYeastIrons)}
		><span class="main">Irons</span><span class="desc">Budding<br />Yeast</span></button
	>
	<div style="clear: both;" />
</div>
