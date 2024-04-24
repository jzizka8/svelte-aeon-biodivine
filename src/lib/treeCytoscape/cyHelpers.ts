import type { Behavior, TreeData, TreeNode } from '$lib/types/treeExplorerTypes';
import type cytoscape from 'cytoscape';
import ComputeEngine from '../../script/ComputeEngine';
import { normalizeClass } from '$lib/utils/utils';
import { activeTabStore } from '$lib/stores/activeTabStore';
import { decisionStore, leafDataStore, mixedDataStore } from '$lib/stores/treeNodeStores';

// Function to get the parent node of a given targetId
function getParentNode(cyInstance: cytoscape.Core, targetId: number): number | undefined {
	const parentEdge = cyInstance.edges(`edge[target='${targetId}']`);
	if (parentEdge.length === 0) {
		return undefined;
	}
	return parseInt(parentEdge.data().source);
}

// Function to get the child node of a given sourceId and positive value
function getChildNode(
	cyInstance: cytoscape.Core,
	sourceId: number,
	positive: string
): number | undefined {
	const childEdge = cyInstance.edges(`edge[source='${sourceId}'][positive='${positive}']`);
	if (childEdge.length === 0) {
		return undefined;
	}
	return parseInt(childEdge.data().target);
}

// Function to get the sibling node of a given targetId
function getSiblingNode(cyInstance: cytoscape.Core, targetId: number): number | undefined {
	const parentEdge = cyInstance.edges(`edge[target='${targetId}']`);
	if (parentEdge.length === 0) {
		return undefined;
	}
	const sourceId = parseInt(parentEdge.data().source);
	const positive = !(parentEdge.data().positive === 'true');
	const childEdge = cyInstance.edges(`edge[source='${sourceId}'][positive='${positive}']`);
	if (childEdge.length === 0) {
		return undefined;
	}
	return parseInt(childEdge.data().target);
}

// Function to get the ID of the selected node
function getSelectedNodeId(cyInstance: cytoscape.Core): number | undefined {
	const node = cyInstance.nodes(':selected');
	if (node.length === 0) return undefined;
	return parseInt(node.data().id);
}

// Function to get the tree data of the selected node
function getSelectedNodeTreeData(cyInstance: cytoscape.Core): TreeData | undefined {
	const node = cyInstance.nodes(':selected');
	if (node.length === 0) return undefined;
	return node.data().treeData;
}

// Function to select a node by its ID
function selectNode(cyInstance: cytoscape.Core, nodeId: number): void {
	const current = cyInstance.nodes(':selected');
	current.unselect();
	cyInstance.getElementById(nodeId.toString()).select();
}

// Function to get the type of a node by its ID
function getNodeType(cyInstance: cytoscape.Core, nodeId: number): string {
	return cyInstance.getElementById(nodeId.toString()).data().type;
}

function getTotalCardinality(cyInstance: cytoscape.Core): number {
	console.log('root', cyInstance.$id('0')[0].data().treeData);
	return cyInstance.$id('0')[0].data().treeData.cardinality;
}

function removeAll(cyInstance: cytoscape.Core): void {
	cyInstance.nodes(':selected').unselect(); // Triggers reset of other UI.
	cyInstance.elements().remove();
}

function ensureNode(cyInstance: cytoscape.Core, treeData: TreeData) {
	const node = cyInstance.getElementById(treeData.id.toString());
	if (node.length > 0) {
		const data = createTreeNode(treeData);
		node.data(data);
		cyInstance.style().update(); //redraw graph
		return node;
	}
	const data = createTreeNode(treeData);
	return cyInstance.add({
		// id: data.id,
		data,
		grabbable: false,
		position: { x: 0.0, y: 0.0 }
	});
}

function ensureEdge(
	cyInstance: cytoscape.Core,
	sourceId: number,
	targetId: number,
	positive: boolean
) {
	const edge = cyInstance.edges('[source = "' + sourceId + '"][target = "' + targetId + '"]');
	if (edge.length >= 1) {
		// Edge exists
		cyInstance.style().update(); //redraw graph
	} else {
		// Make new edge
		cyInstance.add({
			group: 'edges',
			data: { source: sourceId, target: targetId, positive: positive.toString() }
		});
	}
}
function loadBifurcationTree(cyInstance: cytoscape.Core) {
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
function applyTreeLayout(cyInstance: cytoscape.Core) {
	cyInstance
		.layout({
			name: 'dagre',
			roots: [0],
			directed: true,
			avoidOverlap: true,
			animate: true,
			fit: true
		})
		.start();
	cyInstance.fit();
	cyInstance.zoom(cyInstance.zoom() * 0.8);
}

function createTreeNode(treeData: TreeData) {
	const data = {
		id: treeData.id.toString(),
		treeData,
		type: treeData.type,
		label: '',
		subtype: ''
	};

	if (treeData.classes !== undefined) {
		treeData.classes.sort((a, b) => {
			if (a.cardinality == b.cardinality) {
				return a.class.localeCompare(b.class);
			} else if (a.cardinality < b.cardinality) {
				return 1;
			} else {
				return -1;
			}
		});
	}
	if (treeData.type == 'leaf') {
		const normalizedClass = normalizeClass(treeData.class ?? '');
		if (normalizedClass.includes('D')) {
			data.subtype = 'disorder';
		} else if (normalizedClass.includes('O')) {
			data.subtype = 'oscillation';
		} else {
			data.subtype = 'stability';
		}
		data.label = normalizedClass;
		//data.label += "\n(" + treeData.cardinality + ")";
	} else if (treeData.type == 'decision') {
		data.label = treeData.attribute_name ?? '';
	} else if (treeData.type == 'unprocessed') {
		data.label = `Mixed Phenotype\n(${treeData.classes?.length} types)`;
	} else {
		data.label = `${treeData.type}(${treeData.id})`;
	}

	return data;
}

function handleSelect(cyInstance: cytoscape.Core, data: TreeNode) {
	document.getElementById('quick-help')?.classList.add('gone');
	const treeData = data.treeData;
	if (treeData.type == 'leaf') {
		activeTabStore.set('leaf');
		showLeafPanel(cyInstance, data);
	} else if (treeData.type == 'decision') {
		activeTabStore.set('decision');
		decisionStore.set(treeData);
	} else if (treeData.type == 'unprocessed') {
		activeTabStore.set('mixed');
		mixedDataStore.set(treeData);
	}
}

function showLeafPanel(cyInstance: cytoscape.Core, data: TreeNode) {
	const conditions = computeConditions(cyInstance, data.id);
	leafDataStore.set({
		conditions,
		totalCardinality: getTotalCardinality(cyInstance),
		behavior: data.label as Behavior,
		...data.treeData
	});
}
function computeConditions(cyInstance: cytoscape.Core, pathId: string) {
	const conditionsList = [];
	let source = cyInstance.edges(`[target = "${pathId}"]`);

	while (source.length !== 0) {
		const data = source.data();
		const attribute = cyInstance.getElementById(data.source).data().treeData.attribute_name;
		conditionsList.push({ attribute, isPositive: data.positive === 'true' });

		source = cyInstance.edges(`[target = "${data.source}"]`);
	}

	return conditionsList;
}

function removeSingleNode(cyInstance: cytoscape.Core, nodeId: string) {
	const e = cyInstance.getElementById(nodeId);
	if (e.length > 0) {
		e.remove();
	}
}

function undecideSubtree(cyInstance: cytoscape.Core, nodeId: number) {
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

		refreshSelection(cyInstance, nodeId);
	});
}

function refreshSelection(cyInstance: cytoscape.Core, nodeId: number) {
	const newData = cyInstance.$id(nodeId.toString()).data();
	handleSelect(cyInstance, newData);
}

function selectAttribute(cyInstance: cytoscape.Core, nodeId: number, attr: number) {
	ComputeEngine.selectDecisionAttribute(nodeId, attr, (e: string, r: TreeData[]) => {
		populateCytoscape(cyInstance, r);

		refreshSelection(cyInstance, nodeId);
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

		refreshSelection(cyInstance, nodeId);
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
export {
	removeAll,
	undecideSubtree,
	refreshSelection,
	getParentNode,
	getChildNode,
	getSiblingNode,
	getSelectedNodeId,
	getSelectedNodeTreeData,
	selectNode,
	getNodeType,
	ensureNode,
	ensureEdge,
	loadBifurcationTree,
	handleSelect,
	selectAttribute
};

function populateCytoscape(cyInstance: cytoscape.Core, nodesTreeData: TreeData[]) {
	for (const node of nodesTreeData) {
		ensureNode(cyInstance, node);
	}
	for (const node of nodesTreeData) {
		if (node.type == 'decision' && node.left && node.right) {
			ensureEdge(cyInstance, node.id, node.left, false);
			ensureEdge(cyInstance, node.id, node.right, true);
		}
	}
	applyTreeLayout(cyInstance);
}
