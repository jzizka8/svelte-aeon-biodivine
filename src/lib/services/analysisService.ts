import { resultsStore } from '$lib/stores/resultsStore';
import { DecisionTree } from 'aeon-wasm';

export function startAnalysis(model_string: string) {
	const worker = new Worker(new URL('./compute_worker.ts', import.meta.url), {
		type: 'module'
	});
	worker.onmessage = (e) => {
		console.log(e?.data);
		if (e.data.type == 'error') {
			console.error('Error', e.data['error']);
			worker.terminate(); // worker is no longer needed.
			return;
		}
		resultsStore.set(e.data.data);
		if (e.data.type == 'progress') {
			return;
		}
		const tree_data = e.data['tree_data'];

		const dataToStore = {
			data: Array.from(tree_data.data), // Convert 'data' Map to an array of key-value pairs
			network: tree_data.network
		};

		localStorage.setItem('tree_data', JSON.stringify(dataToStore));

		// const td = JSON.parse(localStorage.getItem('tree_data') ?? '');
		// const tree = DecisionTree.from_tree_data(td);
		// console.log(tree);
		// console.log(JSON.parse(tree.get_full_tree()));
		// console.log(JSON.parse(tree.get_attributes(0)));
		// console.log(JSON.parse(tree.auto_expand(0, 3)));
		// tree.free();
		worker.terminate(); // worker is no longer needed.
	};
	worker.postMessage({ type: 'start', model: model_string });
	console.log('Message sent.');
	return worker;
}
