import { writable } from 'svelte/store';

function createIdStore() {
	let value = 0;

	const { subscribe, set } = writable(value);

	return {
		subscribe,
		increment: () => value++,
		reset: () => set((value = 0))
	};
}

export const idStore = createIdStore();
