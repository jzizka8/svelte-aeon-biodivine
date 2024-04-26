import type { computationResult } from '$lib/types/aeon-wasmTypes';
import { writable } from 'svelte/store';

export const resultsStore = writable<computationResult>();
