import { writable } from 'svelte/store';
import ModelEditor from '../../script/ModelEditor';

// Create a read-only store for the ModelEditor module
export const modelEditorStore = writable(ModelEditor, () => {});
