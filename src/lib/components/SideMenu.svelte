<script lang="ts">
	import { activeTabStore } from '$lib/stores/activeTabStore';
	import type { tabType } from '$lib/types/types';
	import Version from './Version.svelte';
	import { modelStore, modelStoreActions } from '$lib/stores/modelStore';
	import { cytoscapeStore } from '$lib/stores/cytoscapeStore';
	import { exportAeon } from '$lib/importExport';
	import { ComputationResult } from 'aeon-wasm';
	import { resultsStore } from '$lib/stores/resultsStore';
	import { startAnalysis } from '$lib/services/analysisService';

	$: modelEmpty = $modelStore.variables.length === 0;
	$: startAnalysisDisabled = modelEmpty || ($resultsStore && !$resultsStore?.is_finished);
	let worker: Worker | undefined;

	const displayTab = (tab: tabType) => {
		activeTabStore.set(tab);
	};

	function handleStartAnalysis() {
		worker = startAnalysis(exportAeon($modelStore));
	}

	function handleClearModel() {
		modelStoreActions.clearModel();
		resultsStore.set(undefined);
		worker?.terminate();
		worker = undefined;
	}
</script>

<div id="side-menu">
	<ul>
		<li>
			<button
				class="button button--half-round button--green {startAnalysisDisabled ? 'disabled' : ''}"
				disabled={startAnalysisDisabled}
				on:click={handleStartAnalysis}
			>
				<img src="img/play_circle_filled-48px.svg" alt="" /> Start Analysis
			</button>
		</li>
		<li>
			<button
				class="button button--half-round button--primary"
				class:disabled={modelEmpty}
				disabled={modelEmpty}
				on:click={() => cytoscapeStore.applyLayout()}
			>
				<img src="img/view_quilt-48px.svg" alt="" /> Apply Layout
			</button>
		</li>
		<li>
			<button
				class="button button--half-round button--primary"
				class:disabled={modelEmpty}
				disabled={modelEmpty}
				on:click={handleClearModel}
			>
				<img src="img/delete-24px.svg" alt="" /> Clear Model
			</button>
		</li>
	</ul>
	<nav>
		<ul>
			<li>
				<button
					class="button button--half-round"
					class:active={$activeTabStore == 'import-export'}
					on:click={() => displayTab('import-export')}
				>
					<img src="img/file_copy-48px.svg" alt="" /> Import / Export
				</button>
			</li>
			<li>
				<button
					class="button button--half-round"
					class:active={$activeTabStore == 'model-editor'}
					on:click={() => displayTab('model-editor')}
				>
					<img src="img/model-48px.svg" alt="" /> Model Editor
				</button>
			</li>
			<li>
				<button
					class="button button--half-round"
					class:active={$activeTabStore == 'results'}
					on:click={() => displayTab('results')}
				>
					<img src="img/call_split-48px.svg" alt="" /> Results
				</button>
			</li>
			<li>
				<button
					class="button button--half-round"
					class:active={$activeTabStore == 'about'}
					on:click={() => displayTab('about')}
				>
					<img src="img/help-48px.svg" alt="" /> About
				</button>
			</li>
		</ul>
	</nav>
	<Version />
</div>

<style>
	#side-menu {
		display: flex;
		flex-direction: column;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: 0;
	}

	.button {
		padding: 1rem 0.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 1rem;
		width: 100%;
		border: none;
		background-color: transparent;
		font-size: 1rem;
	}
	.button:hover,
	.button.active {
		background-color: var(--primary-color-light);
	}

	.button img {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
	}
	.button--half-round {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.button--primary {
		background-color: var(--primary-color-light);
	}
	.button--primary:hover {
		background-color: var(--primary-color);
	}
	.button--green {
		background-color: var(--green-light);
	}
	.button--green:hover {
		background-color: var(--green);
	}
	.button.disabled {
		background-color: gray;
		color: black;
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
