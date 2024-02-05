import { writable } from 'svelte/store';
import LiveModel from '../script/LiveModel';

export const liveModelStore = writable(LiveModel, () => {});
