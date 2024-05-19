<script lang="ts">
	import { onMount } from 'svelte';
	import { modelStore } from '$lib/stores/modelStore';

	import LogoType from '$lib/components/LogoType.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import TabWrapper from '$lib/components/TabWrapper.svelte';

	import PrecisionSlider from '$lib/components/treeExplorer/PrecisionSlider.svelte';
	import QuickHelp from '$lib/components/treeExplorer/QuickHelp.svelte';
	import CytoscapeTreeExplorer from '$lib/treeCytoscape/CytoscapeTreeExplorer.svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await document.fonts.load('1rem "symbols"');
		await document.fonts.load('1rem "FiraMono"');
	});

	let showHelp = true;
	function redirectToMain() {
		goto('/', { replaceState: true });
		console.error('No tree found, redirecting to main page.');
	}
</script>

<svelte:head>
	<title>{$modelStore.name} | Tree explorer AEON</title>
</svelte:head>
<main>
	<CytoscapeTreeExplorer bind:showHelp noTreeAction={redirectToMain} />
	<QuickHelp show={showHelp} />

	<LogoType />
	<TabWrapper />

	<PrecisionSlider />

	<LoadingIndicator />
</main>
