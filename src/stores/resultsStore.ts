import { writable } from 'svelte/store';
import Results from '../script/Results';

export const resultsStore = writable(Results, () => {});
