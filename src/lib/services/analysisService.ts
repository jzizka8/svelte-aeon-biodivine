import { resultsStore } from '$lib/stores/resultsStore';

export function startAnalysis(model_string: string) {
	const worker = new Worker(new URL('./compute_worker.ts', import.meta.url), {
		type: 'module'
	});
	worker.onmessage = (e) => {
		if (e.data.type == 'error') {
			console.error('Error', e.data['error']);
			resultsStore.set({ ...e.data, is_finished: true });
			worker.terminate();
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

		worker.terminate(); // worker is no longer needed.
	};
	worker.postMessage({ type: 'start', model: model_string });
	return worker;
}
