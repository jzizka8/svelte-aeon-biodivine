import { readable } from 'svelte/store';

function createIdStore() {
	let value = 0;

	const { subscribe } = readable(value);

	return {
		subscribe,
		increment: () => value++
	};
}

export const idStore = createIdStore();
