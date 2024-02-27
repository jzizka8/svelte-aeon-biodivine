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
};

export type Regulation = {
	id: string;
	source: Variable;
	target: Variable;
	monotonicity: EdgeMonotonicity;
	observable: boolean;
};
