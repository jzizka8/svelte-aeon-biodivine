import type { LeafData } from '$lib/types/treeExplorerTypes';
import { writable } from 'svelte/store';

export const leafDataStore = writable<LeafData>();
