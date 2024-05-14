import type { computationResult } from '$lib/types/aeon-wasmTypes';
import init, { ComputationResult } from 'aeon-wasm';

console.log('Worker is starting...');

onmessage = async (e) => {
	await init();

	const model_string = e.data['model'];
	try {
		const result = ComputationResult.compute(model_string, (partial_result: computationResult) => {
			postMessage({ type: 'progress', data: partial_result });
		});
		postMessage({ type: 'result', data: result.get_results(), tree_data: result.get_tree_data() });
	} catch (e) {
		console.log('Computation failed', e);
		postMessage({ type: 'error', error: e });
	}
};

console.log('Worker initialized.');
