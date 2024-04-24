import type { TreeData } from '$lib/types/treeExplorerTypes';
import ComputeEngine from '../../script/ComputeEngine';
import { selectNode } from './cyHelpers';
import { removeAll, ensureNode, removeSingleNode, populateCytoscape } from './graphManipulation';

export function loadBifurcationTree(cyInstance: cytoscape.Core) {
	const loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.getBifurcationTree((e: string, r: TreeData[]) => {
		if (e) {
			console.error('No tree data returned', e);
			return;
		}
		removeAll(cyInstance); // remove old tree if present
		populateCytoscape(cyInstance, r);
		loading.classList.add('invisible');
	}, true);
}

export function undecideSubtree(cyInstance: cytoscape.Core, nodeId: number) {
	ComputeEngine.deleteDecision(nodeId, (e: string, r: { removed: number[]; node: TreeData }) => {
		if (e) {
			console.error(e);
			return;
		}
		// removing descendants
		r.removed.forEach((nodeId: number) => {
			removeSingleNode(cyInstance, nodeId.toString());
		});

		if (!r.node) {
			// should not happen
			console.error('result does not contain node');
			return;
		}

		// refreshing the node itself to undecided
		ensureNode(cyInstance, r.node);

		selectNode(cyInstance, nodeId);
	});
}

export function autoExpandBifurcationTree(
	cyInstance: cytoscape.Core,
	nodeId: number,
	depth: number
) {
	const loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.autoExpandBifurcationTree(nodeId, depth, (e: string, r: TreeData[]) => {
		loading.classList.add('invisible');
		if (e) {
			console.error(e);
			return;
		}
		populateCytoscape(cyInstance, r);

		selectNode(cyInstance, nodeId);
	});
}
export function setPrecision(cyInstance: cytoscape.Core, precision: number) {
	const loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.applyTreePrecision(precision, (e, r) => {
		if (e) {
			console.error(e);
			return;
		}
		loadBifurcationTree(cyInstance);
	});
}

export function selectAttribute(cyInstance: cytoscape.Core, nodeId: number, attr: number) {
	ComputeEngine.selectDecisionAttribute(nodeId, attr, (e: string, r: TreeData[]) => {
		populateCytoscape(cyInstance, r);

		selectNode(cyInstance, nodeId);
	});
}
