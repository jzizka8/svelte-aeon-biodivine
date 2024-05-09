import { get } from 'svelte/store';
import { selectedEdgesStore, selectedNodesStore } from '$lib/stores/selectedItemsStore';
import { cytoscapeStore } from '$lib/stores/cytoscapeStore';

export function repositionContextMenus() {
	repositionNodeMenu();
	repositionEdgeMenu();
}

export function repositionNodeMenu() {
	const lastNode = get(selectedNodesStore).items.slice(-1)[0]?.id;
	if (lastNode) {
		selectedNodesStore.updatePosition(get(cytoscapeStore)!.$id(lastNode).renderedPosition());
	}
}

export function repositionEdgeMenu() {
	const lastEdge = get(selectedEdgesStore).items.slice(-1)[0]?.id;
	if (lastEdge) {
		const position = getEdgeMenuPosition(get(cytoscapeStore)!.$id(lastEdge));
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
export function updateElementData(
	cytoscape: cytoscape.Core,
	id: string,
	attributeName: string,
	newValue: any
) {
	const element = cytoscape?.$id(id);
	if (!element || !element.data()) {
		return;
	}

	element.data()[attributeName] = newValue;
	cytoscape.style().update(); // Redraw graph to reflect the change
}
