<script lang="ts">
	import WitnessPanel from './components/WitnessPanel.svelte';

	import { modelStore } from '../../stores/modelStore';
	import { onMount } from 'svelte';
	import { witnessPanelVisible, init } from '../../script/explorerMain';
	onMount(() => {
		init();
	});
</script>

<svelte:head>
	<title>{$modelStore.name} | Explorer AEON</title>
</svelte:head>

<h1 id="logo">Aeon/<span id="title">BIODIVINE</span></h1>

<WitnessPanel />

<!-- A container for the graph vizualization -->
<div id="visjs-container" />

<!-- A valuation panel -->
<div style="display:none" id="explorer-valuations"><div id="explorer-valuations-text" /></div>

<!-- A witness panel -->
<div id="explorer-witness-panel">
	<div id="explorer-witness-text" />
</div>

<div style="position: absolute;">
	<div id="side-menu">
		<div class="button-group" on:click={() => witnessPanelVisible()}>
			<img
				alt="Update functions"
				id="side-menu-functions"
				src="img/functions-48px.svg"
				class="button"
				tab-id="tab-functions"
			/>
			<span class="hint invisible">Update functions</span>
		</div>
	</div>

	<div id="loading-indicator" class="invisible">
		<img src="img/progress.gif" /><br /><br />Waiting for server...
	</div>
</div>
