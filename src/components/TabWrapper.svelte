<script lang="ts">
	import type { tabType } from '../types/types';
	import HelpTab from './HelpTab.svelte';
	import ImportExportTab from './ImportExportTab.svelte';
	import ModelEditorTab from './ModelEditorTab.svelte';
	import ResultsTab from './ResultsTab.svelte';
	import EngingeTab from './EngingeTab.svelte';
	import { activeTabStore } from '../stores/activeTabStore';

	const tabComponents = {
		about: HelpTab,
		'import-export': ImportExportTab,
		'model-editor': ModelEditorTab,
		results: ResultsTab,
		'compute-engine': EngingeTab
	};

	let activeTab: tabType = null;
    activeTabStore.subscribe(value => (activeTab = value));

	$: component = activeTab ? tabComponents[activeTab] : null;
</script>

<!-- This is only a temporary fix to allow initialization of tabs from global js -->
{#each Object.entries(tabComponents) as [key, tab]}
    <div class="{key==activeTab? '' : 'gone'} temp-main">
        
        <svelte:component this={tab}>
            <button class="button button--close" on:click={activeTabStore.close}>
                <img src="img/close-24px.svg" alt="" />
            </button>
        </svelte:component>
    </div>
{/each}

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
    .temp-main{
        grid-area: main;
    }
</style>
