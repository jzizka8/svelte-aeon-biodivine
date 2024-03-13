<script lang="ts">
	import ModelStats from './ModelStats.svelte';

	import ModelVariable from './ModelVariable.svelte';
	import type { ModelStatistics } from '../types/types';

	import { liveModelStore } from '../stores/liveModelStore';
	import { modelStore, modelStoreActions } from '../stores/modelStore';
	import { calculateMaxDegrees } from '$lib/utils/modelStats';
	import { nextMonotonicity } from '$lib/utils/utils';
	import { cytoscapeStore } from '../stores/cytoscapeStore';
	import { selectedNodesStore } from '../stores/selectedNodesStore';

	function handleMonotonicityChange(event: CustomEvent) {
		const regulation = event.detail.regulation;
		const newMonotonicity = nextMonotonicity(regulation.monotonicity);
		modelStoreActions.changeMonotonicity(regulation.id, newMonotonicity);
		cytoscapeStore.updateEdgeMonotonicity(regulation.id, newMonotonicity);
	}

	function handleObservableToggle(event: CustomEvent) {
		const regulation = event.detail.regulation;
		modelStoreActions.toggleObservable(regulation.id);
		cytoscapeStore.updateEdgeObservable(regulation.id, !regulation.observable);
	}

	function handleNameChange(event: Event) {
		modelStoreActions.setName((event.target as HTMLInputElement).value);
	}

	function handleVariableRename(id: string, name: string) {
		modelStoreActions.renameVariable(id, name);
		cytoscapeStore.updateNodeLabel(id, name);
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
			style="font-size: 20px;"
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
		style="margin-top: 4px; margin-bottom: 4px;"
	/>
	<div class="invisible-input full-line" contenteditable>{@html $modelStore.description}</div>
	<div style="height: 30px;">
		<h3 style="font-family: 'FiraMono'; text-transform: uppercase;">● Overview</h3>
	</div>
	<ModelStats {modelStats} />
	<div style="height: 40px;">
		<h3 style="float: left; font-family: 'FiraMono'; text-transform: uppercase;">● Variables</h3>
		<button
			id="button-add-variable"
			class="image-button"
			on:click={() => $LiveModel.addVariable()}
			style="float: right;">Add variable (N) <img src="img/add_box-24px.svg" /></button
		>
	</div>
	<div style="clear: both;" />
	<div id="model-variables" class="full-line" />
	<div class="templates gone">
		<div id="model-variable-template" class="model-variable">
			<div class="invisible-input">
				<input
					class="variable-name"
					type="text"
					name="variable-name"
					value="Variable name"
					placeholder="(variable name)"
					style="font-size: 18px;"
					spellcheck="false"
					autocorrect="off"
				/>
			</div>
			<img alt="Remove variable" src="img/delete-24px.svg" class="model-variable-remove button" />
			<img alt="Show variable" src="img/search-24px.svg" class="model-variable-show button" />
			<br />
			<h4>● Regulators</h4>
			<div class="model-variable-regulators full-line" />
			<h4>● Update Function</h4>
			<div
				class="invisible-input full-line variable-function"
				contenteditable
				data-placeholder="(default)"
				spellcheck="false"
				autocorrect="off"
				style="font-size: 16px; text-align: center;"
			/>
			<div class="variable-function-status" />
		</div>

		<div id="model-regulation-template" class="model-regulation">
			<span class="model-regulation-regulator">Some name</span>
			<span class="model-regulation-short">(->)</span>
			<span class="model-regulation-observable">observable</span>
			<span class="model-regulation-monotonicity">activation</span>
		</div>
	</div>
	<h1>Svelte variables</h1>

	{#each $modelStore.variables as variable (variable.id)}
		<ModelVariable
			isSelected={$selectedNodesStore.nodes.some(node=> node.id == variable.id)}
			{variable}
			regulations={$modelStore.regulations.filter((v) => v.target.id == variable.id)}
			on:delete={() => modelStoreActions.removeVariable(variable.id)}
			on:changeMonotonicity={handleMonotonicityChange}
			on:toggleObservable={handleObservableToggle}
			on:renameVariable={() => handleVariableRename(variable.id, variable.name)}
		/>
	{/each}
</div>
