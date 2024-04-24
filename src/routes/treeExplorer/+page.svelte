<script lang="ts">
	import { onMount } from 'svelte';

	import LogoType from '$lib/components/LogoType.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { modelStore } from '$lib/stores/modelStore';

	import { PrecisionSlider, QuickHelp } from './components';
	import TabWrapper from '$lib/components/TabWrapper.svelte';
	import CytoscapeTreeExplorer from '$lib/treeCytoscape/CytoscapeTreeExplorer.svelte';
	onMount(() => {
		(async () => {
			await document.fonts.load('1rem "symbols"');
			await document.fonts.load('1rem "FiraMono"');
		})();
	});
</script>

<svelte:head>
	<title>{$modelStore.name} | Tree explorer AEON</title>
</svelte:head>
<main>
	<CytoscapeTreeExplorer />
	<QuickHelp />

	<LogoType />
	<TabWrapper />

	<PrecisionSlider />

	<LoadingIndicator />
</main>

<style>
	#cytoscape-editor {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
</style>
