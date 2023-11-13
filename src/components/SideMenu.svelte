<script lang="ts">
	import type { tabType } from '../types/types';
	let startAnalysisDisabled = true;
	let applyLayoutDisabled = false;
	export let activeTab: tabType;

	const displayTab = (tab: tabType) => {
		activeTab = tab;
	};
</script>

<div id="side-menu">
	<ul>
		<li>
			<button
				class="button button--invert-img button--green {startAnalysisDisabled ? 'disabled' : ''}"
				title="You need to connect compute eninge in order to start analysis"
				disabled={startAnalysisDisabled}
			>
				<img src="img/play_circle_filled-48px.svg" alt="" /> Start Analysis
			</button>
		</li>
		<li>
			<button
				class="button button--invert-img button--primary {applyLayoutDisabled ? 'disabled' : ''}"
				disabled={applyLayoutDisabled}
			>
				<img src="img/view_quilt-48px.svg" alt="" /> Apply Layout
			</button>
		</li>
	</ul>
	<nav>
		<ul>
			<li class="">
				<button
					class="button {activeTab == 'compute-engine' ? 'active' : ''}"
					on:click={() => displayTab('compute-engine')}
				>
					<img src="img/engine-48px.svg" alt="" /> Compute Engine
				</button>
			</li>
			<li class="">
				<button
					class="button {activeTab == 'import-export' ? 'active' : ''}"
					on:click={() => displayTab('import-export')}
				>
					<img src="img/file_copy-48px.svg" alt="" /> Import / Export
				</button>
			</li>
			<li class="">
				<button
					class="button {activeTab == 'model-editor' ? 'active' : ''} "
					on:click={() => displayTab('model-editor')}
				>
					<img src="img/model-48px.svg" alt="" /> Model Editor
				</button>
			</li>
			<li class="">
				<button
					class="button {activeTab == 'results' ? 'active' : ''}"
					on:click={() => displayTab('results')}
				>
					<img src="img/call_split-48px.svg" alt="" /> Results
				</button>
			</li>
			<li class="">
				<button
					class="button {activeTab == 'about' ? 'active' : ''}"
					on:click={() => displayTab('about')}
				>
					<img src="img/help-48px.svg" alt="" /> About
				</button>
			</li>
		</ul>
	</nav>
</div>

<style>
	nav {
		margin-top: 6rem;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1.25rem;
		padding-left: 0;
	}

	.button {
		padding: 1rem 0.75rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 1rem;
		width: 100%;
		border: none;
		background-color: transparent;
		font-size: 1.5rem;
		padding-inline: 1rem;
	}
	.button:hover,
	.button.active {
		background-color: var(--primary-color-light);
	}

	.button img {
		width: 2rem;
		height: 2rem;
		margin-right: 0.5rem;
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
