import { getDecisionTree } from './DecisionTree';
import { compareCardinality } from '$lib/utils/comparators';
import type { CardinalityClass, DecisionAttribute } from '$lib/types/treeExplorerTypes';
import { treeCytoscapeManager } from './treeCytoscapeManager';

export function loadBifurcationTree() {
	treeCytoscapeManager.removeAll();

	const tree = getDecisionTree();
	const fullTree = JSON.parse(tree?.get_full_tree());
	treeCytoscapeManager.populateCytoscape(fullTree);
}

export function undecideSubtree(nodeId: number) {
	const tree = getDecisionTree();
	const result = JSON.parse(tree?.revert_decision(nodeId) ?? '');

	// removing descendants
	result.removed.forEach((nodeId: number) => {
		treeCytoscapeManager.removeSingleNode(nodeId.toString());
	});

	if (!result.node) {
		// should not happen
		console.error('result does not contain node');
		return;
	}

	// refreshing the node itself to undecided
	treeCytoscapeManager.ensureNode(result.node);

	treeCytoscapeManager.selectNode(nodeId);
}

export function autoExpandBifurcationTree(nodeId: number, depth: number) {
	const tree = getDecisionTree();
	const expanded = JSON.parse(tree?.auto_expand(nodeId, depth));
	treeCytoscapeManager.populateCytoscape(expanded);

	treeCytoscapeManager.selectNode(nodeId);
}
export function setPrecision(precision: number) {
	getDecisionTree()?.apply_tree_precision(precision);
	loadBifurcationTree();
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

export function selectAttribute(nodeId: number, attr: number) {
	const tree = getDecisionTree();
	const result = JSON.parse(tree?.apply_attribute(nodeId, attr) ?? '');
	treeCytoscapeManager.populateCytoscape(result);

	treeCytoscapeManager.selectNode(nodeId);
}
