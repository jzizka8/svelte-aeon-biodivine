import { get } from 'svelte/store';
import { selectedNodesStore } from '../../stores/selectedItemsStore';
import { cytoscapeStore } from '../../stores/cytoscapeStore';

export function repositionContextMenus () {
    repositionNodeMenu();
    repositionEdgeMenu();
};

export function repositionNodeMenu() {
    const lastNode = get(selectedNodesStore).items.slice(-1)[0]?.id;
    if (lastNode) {
        selectedNodesStore.updatePosition(get(cytoscapeStore)!.$id(lastNode).renderedPosition());
    }
}

export function repositionEdgeMenu() {
    const lastEdge = get(selectedNodesStore).items.slice(-1)[0]?.id;
    if (lastEdge) {
        selectedNodesStore.updatePosition(get(cytoscapeStore)!.$id(lastEdge).renderedPosition());
    }
}
