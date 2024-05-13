<script lang="ts">
	import ModelStats from './ModelStats.svelte';

	import ModelVariable from './ModelVariable.svelte';

	import { modelStore, modelStoreActions } from '$lib/stores/modelStore';
	import { calculateMaxDegrees } from '$lib/utils/modelStats';
	import { nextMonotonicity } from '$lib/utils/utils';
	import { selectedNodesStore } from '$lib/stores/selectedItemsStore';

	function handleMonotonicityChange(event: CustomEvent) {
		const regulation = event.detail.regulation;
		const newMonotonicity = nextMonotonicity(regulation.monotonicity);
		modelStoreActions.changeMonotonicity(regulation.id, newMonotonicity);
	}

	function handleObservableToggle(event: CustomEvent) {
		const regulation = event.detail.regulation;
		modelStoreActions.toggleObservable(regulation.id);
	}

	function handleNameChange(event: Event) {
		modelStoreActions.setName((event.target as HTMLInputElement).value);
	}

	function handleVariableRename(id: string, name: string) {
		try {
			modelStoreActions.renameVariable(id, name);
		} catch (e: any) {
			// TODO: create toasterror
			alert(e.message);
		}
		
	}

	$: [maxIn, maxOut] = calculateMaxDegrees($modelStore.regulations);
	$: modelStats = {
		maxInDegree: maxIn,
		maxOutDegree: maxOut,
		regulationCount: $modelStore.regulations.length,
		variableCount: $modelStore.variables.length,
		parameterSpace: 'TODO',
		stateSpace: 'TODO',
		explicitParameters: ['TODO']
	};
</script>

<div id="tab-model-editor" class="main-panel" style="padding-bottom: 0px;">
	<div class="invisible-input full-line">
		<input
			id="model-name"
			class="center"
			type="text"
			name="model-name"
			placeholder="Untitled model"
			style="font-size: 20px; display: none;"
		/>
		<input
			id="model-name2"
			class="center"
			type="text"
			name="model-name"
			placeholder="Untitled model"
			value={$modelStore.name}
			on:change={handleNameChange}
			style="font-size: 20px;"
		/>
	</div>
	<slot />
	<div
		class="invisible-input full-line"
		id="model-description"
		contenteditable
		data-placeholder="(model description)"
		style="display:none"
	/>
	<div class="invisible-input full-line" contenteditable bind:innerHTML={$modelStore.description} />
	<div style="height: 30px;">
		<h3 style="font-family: 'FiraMono'; text-transform: uppercase;">● Overview</h3>
	</div>
	<ModelStats {modelStats} />

	<button
		id="button-add-variable"
		class="image-button"
		on:click={() => modelStoreActions.createVariable(null)}
		style="float: right;">Add variable (N) <img src="img/add_box-24px.svg" /></button
	>

	<h1>Variables</h1>

	{#each $modelStore.variables as variable (variable.id)}
		<ModelVariable
			isSelected={$selectedNodesStore.items.some((node) => node.id == variable.id)}
			{variable}
			regulations={$modelStore.regulations.filter((v) => v.target.id == variable.id)}
			on:delete={() => modelStoreActions.removeVariable(variable.id)}
			on:changeMonotonicity={handleMonotonicityChange}
			on:toggleObservable={handleObservableToggle}
			on:renameVariable={() => handleVariableRename(variable.id, variable.name)}
		/>
	{/each}
</div>
