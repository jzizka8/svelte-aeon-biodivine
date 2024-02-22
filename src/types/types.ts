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
	inhibition = 'inhibition',
};
