<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { tabType } from '../types/types';
    import HelpTab from './HelpTab.svelte';
    import ImportExportTab from './ImportExportTab.svelte';
    import ModelEditorTab from './ModelEditorTab.svelte';
	import ResultsTab from './ResultsTab.svelte';
	import EngingeTab from './EngingeTab.svelte';

    const tabComponents = {
        'about': HelpTab,
        'import-export': ImportExportTab,
        'model-editor': ModelEditorTab,
        'results': ResultsTab,
        'compute-engine': EngingeTab,
    };

    export let activeTab: tabType;

    $: component =activeTab? tabComponents[activeTab]: null;
</script>

{#if component}
	<svelte:component this={component}>
		<button class="button button--close" on:click={() => (activeTab = null)}>
			<img src="img/close-24px.svg" alt="" />
		</button>
	</svelte:component>
{/if}

<style>
	.button--close {
		display: flex;
		border: none;
		background-color: transparent;
		transition: 0.2s;
		border-radius: 50%;
		padding: 0.3rem;
	}

	.button--close:hover {
		background-color: var(--primary-color);
	}
</style>
