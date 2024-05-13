import { DecisionTree } from 'aeon-wasm';

let cachedTree: DecisionTree | null = null;

export function getDecisionTree(): DecisionTree | null {
	if (!cachedTree) {
		const treeData = localStorage.getItem('tree_data');
		if (!treeData) {
			throw new Error('No tree data found in local storage');
		}
		cachedTree = DecisionTree.from_tree_data(JSON.parse(treeData));
	}
	return cachedTree;
}

