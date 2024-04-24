import { writable } from 'svelte/store';

export const cytoscapeTreeStore = writable<cytoscape.Core | undefined>();
