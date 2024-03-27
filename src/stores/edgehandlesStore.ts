import type { EdgeHandlesInstance } from "cytoscape-edgehandles";
import  { writable } from "svelte/store";

export const edgehandlesStore = writable<EdgeHandlesInstance | null>(null);