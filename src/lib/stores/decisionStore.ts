import type { TreeData } from '$lib/types/treeExplorerTypes';
import { derived, writable } from 'svelte/store';

export const decisionStore = writable<TreeData | undefined>();
export const mixedDataStore = writable<TreeData | undefined>();

export const selectedMixedId = derived(mixedDataStore, ($mixedDataStore) => {
	if ($mixedDataStore) {
		return $mixedDataStore.id;
	}
	return -1;
});
