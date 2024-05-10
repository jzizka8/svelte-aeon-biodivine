import { DecisionTree } from 'aeon-wasm';

export function startAnalysis(model_string: string) {
	const worker = new Worker(new URL('../../compute_worker.ts', import.meta.url), {
		type: 'module'
	});
	worker.onmessage = (e) => {
		if (e.data['type'] == 'progress') {
			console.log('Partial:', e.data['data']);
		} else if (e.data['type'] == 'result') {
			console.log('Done:', e.data['data']);
			const tree_data = e.data['tree_data'];
			console.log('tree_data', tree_data);
			const tree = DecisionTree.from_tree_data(tree_data);
			console.log(tree);
			console.log(tree.get_full_tree());
			console.log(tree.get_attributes(0));
			console.log(tree.auto_expand(0, 3));
			worker.terminate(); // worker is no longer needed.
		} else if (e.data['type'] == 'error') {
			console.log('Error', e.data['error']);
			worker.terminate(); // worker is no longer needed.
		}
	};
	worker.postMessage({ type: 'start', model: model_string });
	console.log('Message sent.');
}
