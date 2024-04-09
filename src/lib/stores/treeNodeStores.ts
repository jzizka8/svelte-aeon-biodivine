import type { LeafData, TreeData } from '$lib/types/treeExplorerTypes';
import { derived, writable } from 'svelte/store';

export const decisionStore = writable<TreeData | undefined>();
export const mixedDataStore = writable<TreeData | undefined>();
export const leafDataStore = writable<LeafData | undefined>();

export const selectedTreeNodeId = derived(
	[mixedDataStore, leafDataStore, decisionStore],
	([$mixed, $leaf, $decision]) => {
		return $mixed?.id ?? $leaf?.id ?? $decision?.id ?? -1;
	}
);
