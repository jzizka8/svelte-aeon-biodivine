import type { TreeData } from '$lib/types/treeExplorerTypes';
import { writable } from 'svelte/store';

export const decisionStore = writable<TreeData | undefined>();
