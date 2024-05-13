<script lang="ts">
	import {
		DecisionTab,
		HelpTab,
		ImportExportTab,
		LeafTab,
		MixedTab,
		ModelEditorTab,
		ResultsTab
	} from './tabs';
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';

	const tabComponents = {
		about: HelpTab,
		'import-export': ImportExportTab,
		'model-editor': ModelEditorTab,
		results: ResultsTab,
		leaf: LeafTab,
		decision: DecisionTab,
		mixed: MixedTab
	};
	onMount(() => {
		hotkeys('esc', { keyup: true, keydown: true }, function (event, handler) {
			event.preventDefault();
			activeTabStore.close();
		});
	});
	$: component = $activeTabStore ? tabComponents[$activeTabStore] : null;
</script>

{#if component}
	<div class=" temp-main">
		<svelte:component this={component}>
			<button class="button button--close" on:click={activeTabStore.close}>
				<img src="img/close-24px.svg" alt="" />
			</button>
		</svelte:component>
	</div>
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
	.temp-main {
		grid-area: main;
	}
</style>
