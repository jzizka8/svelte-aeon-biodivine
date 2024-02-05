export type tabType =
	| 'about'
	| 'compute-engine'
	| 'import-export'
	| 'results'
	| 'model-editor'
	| null;

export type EdgeMonotonicity = {
	unspecified: 'unspecified';
	activation: 'activation';
	inhibition: 'inhibition';
};
