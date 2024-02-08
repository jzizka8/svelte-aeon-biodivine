<script lang="ts">
	import { onMount } from 'svelte';
    import { init } from '../../script/main';
	import { witnessPanelVisible } from '../../script/explorerMain';
	onMount(() => {
		init();
	});
</script>
<h1 id="logo">Aeon/<span id="title">BIODIVINE</span></h1>

<div style="position:absolute" id="explorer-witness-panel" class="main-panel gone">
	<img
		alt="close"
		src="img/close-24px.svg"
		class="panel-close-button"
		on:click={()=>witnessPanelVisible(false)}
	/>
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		Witness update functions
	</h2>
	<ul id="explorer-update-functions" style="list-style:none" />
</div>

<!-- A container for the graph vizualization -->
<div id="visjs-container" />

<!-- A valuation panel -->
<div style="display:none" id="explorer-valuations"><div id="explorer-valuations-text" /></div>

<!-- A witness panel -->
<div id="explorer-witness-panel">
	<div id="explorer-witness-text" ></div>
</div>

<!-- engine address  -->
<div id="engine-address" style="display:none">http://localhost:8000/</div>

<div style="position: absolute;">
	<div id="side-menu">
		<div class="button-group" on:click={()=>witnessPanelVisible()}>
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
