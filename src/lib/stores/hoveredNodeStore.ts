import { writable } from 'svelte/store';

export const hoveredNodeStore = writable<string | null>(null);
