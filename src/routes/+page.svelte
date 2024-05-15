<script lang="ts">
	import { onMount } from 'svelte';

	import QuickHelp from './components/QuickHelp.svelte';
	import CytoscapeEditor from './components/CytoscapeEditor.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import LogoType from '$lib/components/LogoType.svelte';

	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import TabWrapper from '$lib/components/TabWrapper.svelte';
	import { modelStore } from '$lib/stores/modelStore';
	import init, { DecisionTree } from 'aeon-wasm';
	import { startAnalysis } from '$lib/services/analysisService';
	import { exportAeon, importAeon } from '$lib/importExport';

	const AEON_MODEL = `
		v_Sp8 -| v_Emx2
		v_Coup_fti -> v_Emx2
		v_Pax6 -| v_Emx2
		v_Fgf8 -| v_Emx2
		v_Emx2 -| v_Sp8
		v_Fgf8 -> v_Sp8
		v_Sp8 -| v_Coup_fti
		v_Fgf8 -| v_Coup_fti
		v_Sp8 -> v_Pax6
		v_Coup_fti -| v_Pax6
		v_Emx2 -| v_Pax6
		v_Sp8 -> v_Fgf8
		v_Emx2 -| v_Fgf8
		v_Fgf8 -> v_Fgf8
		$v_Coup_fti: (!(v_Fgf8 | v_Sp8) | !(v_Sp8 | v_Fgf8))
		$v_Emx2: (v_Coup_fti & !((v_Fgf8 | v_Sp8) | v_Pax6))
		#$v_Fgf8: ((v_Fgf8 & v_Sp8) & !v_Emx2)
		#$v_Pax6: (v_Sp8 & !(v_Emx2 | v_Coup_fti))
		#$v_Sp8: (v_Fgf8 & !v_Emx2)
		`;

	onMount(async () => {
		await init();
		importAeon(AEON_MODEL);
	});
</script>

<svelte:head>
	<title>{$modelStore.name} | AEON</title>
</svelte:head>
<main class="index-page">
	<!-- active tab can be opened from side menu and from the tab wrapper -->

	<SideMenu />
	<TabWrapper />
	<CytoscapeEditor />

	<div id="cytoscape-editor" />
	<!-- absolutely positioned stuff -->
	<LogoType />
	<LoadingIndicator />
	<QuickHelp show={$modelStore.variables.length === 0} />
</main>

<style>
</style>
