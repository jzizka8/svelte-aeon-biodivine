export type tabType =
	| 'about'
	| 'compute-engine'
	| 'import-export'
	| 'results'
	| 'model-editor'
	| null;

export enum EdgeMonotonicity {
	unspecified = 'unspecified',
	activation = 'activation',
	inhibition = 'inhibition'
}

export type Model = {
	id: string;
	name: string;
	description: string;
	regulations: Regulation[];
	variables: Variable[];
};

export type Variable = {
	id: string;
	name: string;
	updateFunction: string;
	initPosition: null | Position;
};

export type Node = {
	id: string;
	label: string;
	initPosition: null | Position;
};

export type Position = {
	x: number;
	y: number;
};
export type Regulation = {
	id: string;
	source: Variable;
	target: Variable;
	monotonicity: EdgeMonotonicity;
	observable: boolean;
};

export type ModelStatistics = {
	maxInDegree: number;
	maxOutDegree: number;
	variableCount: number;
	regulationCount: number;
	parameterSpace: string;
	stateSpace: string;
	explicitParameters: string[];
};
