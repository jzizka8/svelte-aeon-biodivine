<script lang="ts">
	import { onMount } from 'svelte';

	import QuickHelp from './components/QuickHelp.svelte';
	import SideMenu from '../components/SideMenu.svelte';
	import CytoScapeEditor from '../components/Cytoscape/CytoScapeEditor.svelte';
	import LogoType from '../components/LogoType.svelte';
	import NodeMenu from '../components/NodeMenu.svelte';
	import EdgeMenu from '../components/EdgeMenu.svelte';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import TabWrapper from '../components/TabWrapper.svelte';
	import { init } from '../script/main';
	import { modelStore } from '../stores/modelStore';

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
	<CytoScapeEditor />

	<NodeMenu />
	<EdgeMenu />
	<div id="cytoscape-editor" />
	<!-- absolutely positioned stuff -->
	<LogoType />
	<LoadingIndicator />
	<QuickHelp />
</main>

<style>
</style>
