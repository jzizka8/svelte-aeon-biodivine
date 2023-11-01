<script>
	import HelpTab from '../components/HelpTab.svelte';
	import QuickHelp from '../components/QuickHelp.svelte';
	import SideMenu from '../components/SideMenu.svelte';
	import ResultsTab from '../components/ResultsTab.svelte';
	import CytoScapeEditor from '../components/CytoScapeEditor.svelte';
	import Version from '../components/Version.svelte';
	import LogoType from '../components/LogoType.svelte';
	import ImportExportTab from '../components/ImportExportTab.svelte';
	import EngingeTab from '../components/EngingeTab.svelte';
	import ModelEditorTab from '../components/ModelEditorTab.svelte';
	import NodeMenu from '../components/NodeMenu.svelte';
	import EdgeMenu from '../components/EdgeMenu.svelte';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
</script>

<CytoScapeEditor />

<LogoType />
<Version />
<NodeMenu />
<EdgeMenu />

<QuickHelp />

<div style="position: absolute;">
	<ModelEditorTab />

	<EngingeTab />

	<ImportExportTab />

	<ResultsTab />

	<HelpTab />

	<SideMenu />

	<LoadingIndicator />
</div>
