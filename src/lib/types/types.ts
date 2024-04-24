export type tabType =
	| 'about'
	| 'compute-engine'
	| 'import-export'
	| 'results'
	| 'model-editor'
	| 'leaf'
	| 'decision'
	| 'mixed'
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
	initPosition: undefined | Position;
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

export type Node = {
	id: string;
	label: string;
	initPosition: undefined | Position;
};

export type Edge = {
	id: string;
	source: string;
	target: string;
	monotonicity: EdgeMonotonicity;
	observable: boolean;
};
