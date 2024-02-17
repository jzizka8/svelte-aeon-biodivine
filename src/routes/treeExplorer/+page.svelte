<script lang="ts">
	import { onMount } from 'svelte';

	import LogoType from '../../components/LogoType.svelte';
	import LoadingIndicator from '../../components/LoadingIndicator.svelte';
	import { EXPECTED_ENGINE_VERSION } from '../../const';
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
	<title>Tree explorer | AEON {EXPECTED_ENGINE_VERSION}</title>
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
