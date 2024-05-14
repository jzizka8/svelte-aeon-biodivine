// import type { TreeData } from '$lib/types/treeExplorerTypes';
// import { createTreeNode } from './cyHelpers';

// export function populateCytoscape(cyInstance: cytoscape.Core, nodesTreeData: TreeData[]) {
// 	for (const node of nodesTreeData) {
// 		ensureNode(cyInstance, node);
// 	}
// 	for (const node of nodesTreeData) {
// 		if (node.type == 'decision' && node.left && node.right) {
// 			ensureEdge(cyInstance, node.id, node.left, false);
// 			ensureEdge(cyInstance, node.id, node.right, true);
// 		}
// 	}
// 	applyTreeLayout(cyInstance);
// }
// export function removeSingleNode(cyInstance: cytoscape.Core, nodeId: string) {
// 	const e = cyInstance.getElementById(nodeId);
// 	if (e.length > 0) {
// 		e.remove();
// 	}
// }
// export function removeAll(cyInstance: cytoscape.Core): void {
// 	cyInstance.nodes(':selected').unselect(); // Triggers reset of other UI.
// 	cyInstance.elements().remove();
// }

// export function ensureNode(cyInstance: cytoscape.Core, treeData: TreeData) {
// 	const node = cyInstance.getElementById(treeData.id.toString());
// 	if (node.length > 0) {
// 		const data = createTreeNode(treeData);
// 		node.data(data);
// 		cyInstance.style().update(); //redraw graph
// 		return node;
// 	}
// 	const data = createTreeNode(treeData);
// 	return cyInstance.add({
// 		// id: data.id,
// 		data,
// 		grabbable: false,
// 		position: { x: 0.0, y: 0.0 }
// 	});
// }

// export function ensureEdge(
// 	cyInstance: cytoscape.Core,
// 	sourceId: number,
// 	targetId: number,
// 	positive: boolean
// ) {
// 	const edge = cyInstance.edges('[source = "' + sourceId + '"][target = "' + targetId + '"]');
// 	if (edge.length >= 1) {
// 		// Edge exists
// 		cyInstance.style().update(); //redraw graph
// 	} else {
// 		// Make new edge
// 		cyInstance.add({
// 			group: 'edges',
// 			data: { source: sourceId, target: targetId, positive: positive.toString() }
// 		});
// 	}
// }

// export function applyTreeLayout(cyInstance: cytoscape.Core) {
// 	cyInstance
// 		.layout({
// 			name: 'dagre',
// 			roots: [0],
// 			directed: true,
// 			avoidOverlap: true,
// 			animate: true,
// 			fit: true
// 		})
// 		.start();
// 	cyInstance.fit();
// 	cyInstance.zoom(cyInstance.zoom() * 0.8);
// }
