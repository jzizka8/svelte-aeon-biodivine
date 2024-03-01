<script lang="ts">
	import { onMount } from 'svelte';

	import LogoType from '../../components/LogoType.svelte';
	import LoadingIndicator from '../../components/LoadingIndicator.svelte';
	import { modelStore } from '../../stores/modelStore';
	import { init } from '../../script/treeExplorerMain';

	import {
		PrecisionSlider,
		TransparencySwitch,
		MixedInfo,
		QuickHelp,
		LeafInfo,
		DecisionInfo
	} from './components';
	onMount(() => {
		init();
	});
</script>

<svelte:head>
	<title>{$modelStore.name} | Tree explorer AEON</title>
</svelte:head>
<main>
	<div id="cytoscape-editor" />

	<QuickHelp />

	<LogoType />

	<DecisionInfo />

	<MixedInfo />

	<LeafInfo />

	<TransparencySwitch />

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
