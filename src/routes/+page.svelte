<script lang="ts">
	import { onMount } from 'svelte';

	import QuickHelp from './components/QuickHelp.svelte';
	import CytoscapeEditor from './components/CytoscapeEditor.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import LogoType from '$lib/components/LogoType.svelte';

	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import TabWrapper from '$lib/components/TabWrapper.svelte';
	import { init } from '../script/main';
	import { modelStore } from '$lib/stores/modelStore';

	onMount(() => {
		init();
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
	<QuickHelp />
</main>

<style>
</style>
