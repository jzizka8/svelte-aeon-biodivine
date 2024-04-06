<script lang="ts">
	import { computeEngineStore } from '$lib/stores/ComputeEngineStore'; // Adjust the import according to your actual file structure
	import { Behavior } from '$lib/types/treeExplorerTypes';
	import type { Stability } from '$lib/types/treeExplorerTypes';

	export let id: number;

	let stabilityData: Stability[] = [];
	let selectedBehavior: Behavior = Behavior.Total;
	let errorText = '';

	// Function to load stability data using the callback pattern
	function loadStabilityData(id: number, behavior: Behavior) {
		$computeEngineStore.getStabilityData(id, behavior, (error: string, result: Stability[]) => {
			errorText = error;
			stabilityData = result ?? [];
		});
	}

    // Reset the stability data and selected behavior when the id changes
	$: {
		if (id) {
			stabilityData = []; 
			selectedBehavior = Behavior.Total; 
		}
	}

	function getVectorClass(vector: string) {
		if (vector == 'true') {
			return 'green';
		} else if (vector == 'false') {
			return 'red';
		} else {
			return 'black';
		}
	}
	// join the vector parts with comma and put brackets around it
	function formatVector(vector: string[]) {
		return (
			'[' +
			vector
				.map((part) => `<b><span class="${getVectorClass(part)}">${part}</span></b>`)
				.join(', ') +
			']'
		);
	}
</script>

<select bind:value={selectedBehavior} class="stability-dropdown">
	<option value={Behavior.Total}>Total</option>
	<option value={Behavior.Stability}>Stability</option>
	<option value={Behavior.Oscillation}>Oscillation</option>
	<option value={Behavior.Disorder}>Disorder</option>
</select>

<button
	id="stability-analysis-button"
	class="image-button"
	style="float: right; margin-bottom: 16px; margin-right: 16px;"
	on:click={() => loadStabilityData(id, selectedBehavior)}
>
	Stability analysis (S) <img src="img/stability_analysis-24px.svg" />
</button>

<!-- Stability Data Display -->
{#if stabilityData.length > 0}
	<div>
		<h4>Stability analysis:</h4>
		<ul class="outer-list">
			{#each stabilityData as item}
				<li>
					<b>{item.variable}</b>:
					{#if item.data.length === 1}
						always {@html formatVector(item.data[0].vector)}
					{:else}
						<ul class="inner-list">
							{#each item.data as data}
								<li>
									{@html formatVector(data.vector)}
									: {data.colors}
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{:else if errorText}
	<div class="error-message">
		<p>Error: {errorText}</p>
	</div>
{/if}

<style>
    .outer-list {
        list-style-type: none;
        padding-left: 0;
    }

    .inner-list {
        list-style-type: '- ';
    }

</style>
