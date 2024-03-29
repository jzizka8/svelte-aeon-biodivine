import { writable } from 'svelte/store';

export const focusedInputStore = writable<'name' | 'function' | null>(null);
