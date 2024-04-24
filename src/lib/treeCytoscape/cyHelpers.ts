import type { Behavior, TreeData, TreeNode } from '$lib/types/treeExplorerTypes';
import type cytoscape from 'cytoscape';
import { normalizeClass } from '$lib/utils/utils';
import { activeTabStore } from '$lib/stores/activeTabStore';
import { decisionStore, leafDataStore, mixedDataStore } from '$lib/stores/treeNodeStores';
import { compareCardinality } from '$lib/utils/comparators';

// Function to get the parent node of a given targetId
export function getParentNode(cyInstance: cytoscape.Core, targetId: number): number | undefined {
	const parentEdge = cyInstance.edges(`edge[target='${targetId}']`);
	if (parentEdge.length === 0) {
		return undefined;
	}
	return parseInt(parentEdge.data().source);
}

// Function to get the child node of a given sourceId and positive value
export function getChildNode(
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
export function getSiblingNode(cyInstance: cytoscape.Core, targetId: number): number | undefined {
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
export function getSelectedNodeId(cyInstance: cytoscape.Core): number | undefined {
	const node = cyInstance.nodes(':selected');
	if (node.length === 0) return undefined;
	return parseInt(node.data().id);
}

// Function to get the tree data of the selected node
export function getSelectedNodeTreeData(cyInstance: cytoscape.Core): TreeData | undefined {
	const node = cyInstance.nodes(':selected');
	if (node.length === 0) return undefined;
	return node.data().treeData;
}

// Function to get the type of a node by its ID
export function getNodeType(cyInstance: cytoscape.Core, nodeId: number): string {
	return cyInstance.getElementById(nodeId.toString()).data().type;
}

function getTotalCardinality(cyInstance: cytoscape.Core): number {
	console.log('root', cyInstance.$id('0')[0].data().treeData);
	return cyInstance.$id('0')[0].data().treeData.cardinality;
}

export function createTreeNode(treeData: TreeData) {
	const data = {
		id: treeData.id.toString(),
		treeData,
		type: treeData.type,
		label: getNodeLabel(treeData),
		subtype: ''
	};

	if (treeData.classes !== undefined) {
		treeData.classes.sort(compareCardinality);
	}
	if (treeData.type === 'leaf') {
		const normalizedClass = normalizeClass(treeData.class ?? '');
		if (normalizedClass.includes('D')) {
			data.subtype = 'disorder';
		} else if (normalizedClass.includes('O')) {
			data.subtype = 'oscillation';
		} else {
			data.subtype = 'stability';
		}
	}
	return data;
}

function getNodeLabel(treeData: TreeData): string {
	switch (treeData.type) {
		case 'leaf':
			return normalizeClass(treeData.class ?? '');
		case 'decision':
			return treeData.attribute_name ?? '';
		case 'unprocessed':
			return `Mixed Phenotype\n(${treeData.classes?.length} types)`;
		default:
			return `${treeData.type}(${treeData.id})`;
	}
}

export function handleSelect(cyInstance: cytoscape.Core, data: TreeNode) {
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

export function selectNode(cyInstance: cytoscape.Core, nodeId: number): void {
	const current = cyInstance.nodes(':selected');
	current.unselect();
	cyInstance.getElementById(nodeId.toString()).select();
}
