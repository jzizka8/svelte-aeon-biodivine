import { getDecisionTree } from './DecisionTree';
import { selectNode } from './cyHelpers';
import { removeAll, ensureNode, removeSingleNode, populateCytoscape } from './graphManipulation';
import { compareCardinality } from '$lib/utils/comparators';
import type { CardinalityClass, DecisionAttribute } from '$lib/types/treeExplorerTypes';

export function loadBifurcationTree(cyInstance: cytoscape.Core) {
	removeAll(cyInstance);

	const tree = getDecisionTree();
	console.log(tree?.get_tree_precision());
	const fullTree = JSON.parse(tree?.get_full_tree());
	console.log(fullTree);
	populateCytoscape(cyInstance, fullTree);
}

export function undecideSubtree(cyInstance: cytoscape.Core, nodeId: number) {
	const tree = getDecisionTree();
	const result = JSON.parse(tree?.revert_decision(nodeId) ?? '');
	console.log(result);

	// removing descendants
	result.removed.forEach((nodeId: number) => {
		removeSingleNode(cyInstance, nodeId.toString());
	});

	if (!result.node) {
		// should not happen
		console.error('result does not contain node');
		return;
	}

	// refreshing the node itself to undecided
	ensureNode(cyInstance, result.node);

	selectNode(cyInstance, nodeId);
}

export function autoExpandBifurcationTree(
	cyInstance: cytoscape.Core,
	nodeId: number,
	depth: number
) {
	console.log('expanding');
	const tree = getDecisionTree();
	const expanded = JSON.parse(tree?.auto_expand(nodeId, depth));
	console.log(expanded);
	populateCytoscape(cyInstance, expanded);

	selectNode(cyInstance, nodeId);
}
export function setPrecision(cyInstance: cytoscape.Core, precision: number) {
	getDecisionTree()?.apply_tree_precision(precision);
	loadBifurcationTree(cyInstance);
}
export function getPrecision() {
	return getDecisionTree()?.get_tree_precision() ?? 10000;
}

export function getAttributes(nodeId: number) {
	const tree = getDecisionTree();
	const result = JSON.parse(tree?.get_attributes(nodeId)) ?? [];

	function calcTotal(cardinalities: CardinalityClass[]) {
		return cardinalities.reduce((a: number, b: CardinalityClass) => a + b.cardinality, 0);
	}

	result.forEach((attr: DecisionAttribute) => {
		// Prepare data:
		attr.left.sort(compareCardinality);
		attr.right.sort(compareCardinality);
		attr.leftTotal = calcTotal(attr.left);
		attr.rightTotal = calcTotal(attr.right);
	});

	return result;
}

export function selectAttribute(cyInstance: cytoscape.Core, nodeId: number, attr: number) {
	const tree = getDecisionTree();
	const result = JSON.parse(tree?.apply_attribute(nodeId, attr) ?? '');
	populateCytoscape(cyInstance, result);

	selectNode(cyInstance, nodeId);
}
