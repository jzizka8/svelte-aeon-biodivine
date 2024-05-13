import { get } from 'svelte/store';
import { selectedEdgesStore, selectedNodesStore } from '$lib/stores/selectedItemsStore';
import { cytoscapeManager } from './CytoscapeManager';

export function repositionContextMenus() {
	repositionNodeMenu();
	repositionEdgeMenu();
}

export function repositionNodeMenu() {
	const lastNode = get(selectedNodesStore).items.slice(-1)[0]?.id;
	if (lastNode) {
		selectedNodesStore.updatePosition(cytoscapeManager.getElementById(lastNode).renderedPosition());
	}
}

export function repositionEdgeMenu() {
	const lastEdge = get(selectedEdgesStore).items.slice(-1)[0]?.id;
	if (lastEdge) {
		const position = getEdgeMenuPosition(cytoscapeManager.getElementById(lastEdge));
		selectedEdgesStore.updatePosition(position);
	}
}

export function getEdgeMenuPosition(cyEdge: cytoscape.EdgeSingular) {
	const boundingBox = cyEdge.renderedBoundingBox();
	return {
		x: (boundingBox.x1 + boundingBox.x2) / 2,
		y: (boundingBox.y1 + boundingBox.y2) / 2
	};
}

