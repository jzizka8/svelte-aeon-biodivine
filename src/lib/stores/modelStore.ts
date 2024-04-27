import { get, writable } from 'svelte/store';
import {
	type Model,
	type Variable,
	type Regulation,
	EdgeMonotonicity,
	type Position
} from '$lib/types/types'; // Adjust the import path to where your types are defined
import { generateRegulationId } from '$lib/utils/utils';
import { idStore } from './idStore';

const initialState: Model = {
	id: '',
	name: 'Untitled Model',
	description: '',
	regulations: [],
	variables: []
};

const modelStore = writable<Model>(initialState);

const modelStoreActions = {
	updateModel: function (model: Model) {
		modelStore.set(model);
	},
	clearModel: function () {
		modelStore.set(initialState);
	},
	createVariable: function (name: string | null, position: Position | undefined = undefined) {
		modelStore.update((currentModel) => {
			const id = idStore.increment().toString();
			const usedName = name || `v_${id}`;
			const newVariable: Variable = {
				id,
				name: usedName,
				updateFunction: '',
				initPosition: position
			};
			return {
				...currentModel,
				variables: [...currentModel.variables, newVariable]
			};
		});
	},
	addVariable: function (variable: Variable) {
		modelStore.update((currentModel) => ({
			...currentModel,
			variables: [...currentModel.variables, variable]
		}));
	},
	setDescription: function (description: string) {
		modelStore.update((currentModel) => ({
			...currentModel,
			description
		}));
	},
	setName: function (name: string) {
		modelStore.update((currentModel) => ({
			...currentModel,
			name
		}));
	},
	createRegulation: function (
		sourceId: string,
		targetId: string,
		monotonicity = EdgeMonotonicity.unspecified,
		observable = true
	) {
		modelStore.update((currentModel) => {
			const regulationId = generateRegulationId(sourceId, targetId);
			const existingRegulation = currentModel.regulations.find(
				(regulation) => regulation.id === regulationId
			);
			if (existingRegulation) {
				return currentModel;
			}

			const source = currentModel.variables.find((node) => node.id == sourceId);
			const target = currentModel.variables.find((node) => node.id == targetId);
			if (!source || !target) {
				return currentModel;
			}
			const newEdge: Regulation = {
				id: regulationId,
				source,
				target,
				monotonicity,
				observable
			};
			return {
				...currentModel,
				regulations: [...currentModel.regulations, newEdge]
			};
		});
	},

	removeRegulation: function (edgeId: string) {
		modelStore.update((currentModel) => ({
			...currentModel,
			regulations: currentModel.regulations.filter((edge) => edge.id !== edgeId)
		}));
	},
	changeMonotonicity: function (edgeId: string, monotonicity: EdgeMonotonicity) {
		modelStore.update((currentModel) => ({
			...currentModel,
			regulations: currentModel.regulations.map((edge) =>
				edge.id === edgeId ? { ...edge, monotonicity } : edge
			)
		}));
	},
	removeVariable: function (nodeId: string) {
		modelStore.update((currentModel) => ({
			...currentModel,
			variables: currentModel.variables.filter((node) => node.id !== nodeId),
			regulations: currentModel.regulations.filter(
				(edge) => edge.source.id !== nodeId && edge.target.id !== nodeId
			)
		}));
	},
	renameVariable: function (nodeId: string, name: string) {
		let errorMessage = '';
		modelStore.update((currentModel) => {
			const nameLike = currentModel.variables.find(
				(node) => node.name === name && node.id !== nodeId
			);

			if (nameLike) {
				errorMessage = `Variable with name ${name} already exists`;
				return currentModel;
			}

			return {
				...currentModel,
				variables: currentModel.variables.map((node) =>
					node.id === nodeId ? { ...node, name } : node
				)
			};
		});
		if (errorMessage) {
			throw new Error(errorMessage);
		}
	},
	setVariableUpdateFunction: function (nodeId: string, updateFunction: string) {
		modelStore.update((currentModel) => {
			const updatedVariables = currentModel.variables.map((node) =>
				node.id === nodeId ? { ...node, updateFunction } : node
			);
			return { ...currentModel, variables: updatedVariables };
		});
	},
	toggleObservable: function (edgeId: string) {
		modelStore.update((currentModel) => ({
			...currentModel,
			regulations: currentModel.regulations.map((edge) =>
				edge.id === edgeId ? { ...edge, observable: !edge.observable } : edge
			)
		}));
	},
	getVariableId(name: string) {
		const model = get(modelStore);
		const variable = model.variables.find((v) => v.name === name);
		if (!variable) {
			throw new Error(`Variable with name ${name} not found`);
		}
		return variable.id;
	}
};

export { modelStore, modelStoreActions };
