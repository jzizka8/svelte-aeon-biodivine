<script lang="ts">
	import type { tabType } from '$lib/types/types';
	import HelpTab from './HelpTab.svelte';
	import ImportExportTab from './ImportExportTab.svelte';
	import ModelEditorTab from './ModelEditorTab.svelte';
	import ResultsTab from './ResultsTab.svelte';
	import EngingeTab from './EngingeTab.svelte';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import {LeafTab, DecisionTab, MixedTab }from '../../routes/treeExplorer/components/';

	const tabComponents = {
		about: HelpTab,
		'import-export': ImportExportTab,
		'model-editor': ModelEditorTab,
		results: ResultsTab,
		'compute-engine': EngingeTab,
		'leaf': LeafTab,
		'decision': DecisionTab,
		'mixed': MixedTab
	};
	onMount(() => {
		hotkeys('esc', { keyup: true, keydown: true }, function (event, handler) {
			event.preventDefault();
			activeTabStore.close();
		});
	});
	$: component = $activeTabStore ? tabComponents[$activeTabStore] : null;
</script>

<!-- This is only a temporary fix to allow initialization of tabs from global js -->
{#each Object.entries(tabComponents) as [key, tab]}
	<div class="{key == $activeTabStore ? '' : 'gone'} temp-main">
		<svelte:component this={tab}>
			<button class="button button--close" on:click={activeTabStore.close}>
				<img src="img/close-24px.svg" alt="" />
			</button>
		</svelte:component>
	</div>
{/each}
<!-- TODO: use this when possible -->
<!-- 
	{#if component}
	<div class=" temp-main">
		<svelte:component this={component}>
			<button class="button button--close" on:click={activeTabStore.close}>
				<img src="img/close-24px.svg" alt="" />
			</button>
		</svelte:component>
	</div>
{/if} -->
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
	.temp-main {
		grid-area: main;
	}
</style>
