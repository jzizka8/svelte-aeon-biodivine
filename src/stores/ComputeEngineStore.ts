
import { writable } from 'svelte/store';
import { ComputeEngine } from '../script/ComputeEngine';

// Create the ComputeEngine store using the writable function
export const computeEngineStore = writable(ComputeEngine, () => { });
