import type { EdgeHandlesInstance } from "cytoscape-edgehandles";
import  { writable } from "svelte/store";

// function createEdgehandlesStore() {
//     return writable<EdgeHandlesInstance | null>(null); // Store holding cyInstance
    
//  }

export const edgehandlesStore = writable<EdgeHandlesInstance | null>(null);