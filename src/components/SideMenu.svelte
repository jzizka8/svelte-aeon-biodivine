<script lang="ts">
	import { activeTabStore } from '../stores/activeTabStore';
	import type { tabType } from '../types/types';
	import Version from './Version.svelte';
	import { computeEngineStore } from '../stores/ComputeEngineStore';
	let startAnalysisDisabled = false;
	let applyLayoutDisabled = false;

    $: ComputeEngine = $computeEngineStore;

	const displayTab = (tab: tabType) => {
        activeTabStore.set(tab);
	};
</script>

<div id="side-menu">
	<ul>
		<li>
			<button
				class="button button--half-round button--green {startAnalysisDisabled ? 'disabled' : ''}"
				title="You need to connect compute eninge in order to start analysis"
				disabled={startAnalysisDisabled}
                on:click={()=>ComputeEngine.startComputation(LiveModel.exportAeon())}
			>
				<img src="img/play_circle_filled-48px.svg" alt="" /> Start Analysis
			</button>
		</li>
		<li>
			<button
				class="button button--half-round button--primary {applyLayoutDisabled ? 'disabled' : ''}"
				disabled={applyLayoutDisabled}
                onclick="CytoscapeEditor.layoutCose();" 
			>
				<img src="img/view_quilt-48px.svg" alt="" /> Apply Layout
			</button>
		</li>
	</ul>
	<nav>
		<ul>
			<li class="">
				<button
					class="button button--half-round engine-dot-container {$activeTabStore == 'compute-engine' ? 'active' : ''}"
					on:click={() => displayTab('compute-engine')}
				>
                <img src="img/engine-48px.svg" alt="" /> Compute Engine
                <span id="engine-dot">●</span>
				</button>
			</li>
			<li class="">
				<button
					class="button button--half-round {$activeTabStore == 'import-export' ? 'active' : ''}"
					on:click={() => displayTab('import-export')}
				>
					<img src="img/file_copy-48px.svg" alt="" /> Import / Export
				</button>
			</li>
			<li class="">
				<button
					class="button button--half-round {$activeTabStore == 'model-editor' ? 'active' : ''} "
					on:click={() => displayTab('model-editor')}
				>
					<img src="img/model-48px.svg" alt="" /> Model Editor
				</button>
			</li>
			<li class="">
				<button
					class="button button--half-round {$activeTabStore == 'results' ? 'active' : ''}"
					on:click={() => displayTab('results')}
				>
					<img src="img/call_split-48px.svg" alt="" /> Results
				</button>
			</li>
			<li class="">
				<button
					class="button button--half-round {$activeTabStore == 'about' ? 'active' : ''}"
					on:click={() => displayTab('about')}
				>
					<img src="img/help-48px.svg" alt="" /> About
				</button>
			</li>
		</ul>
	</nav>
	<Version/>
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
    .button--half-round{
        border-top-left-radius:0;
        border-bottom-left-radius:0;
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
