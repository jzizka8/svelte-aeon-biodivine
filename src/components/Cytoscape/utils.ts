import { get } from 'svelte/store';
import { selectedNodesStore } from '../../stores/selectedNodesStore';
import { cytoscapeStore } from '../../stores/cytoscapeStore';

export function repositionContextMenus () {
    repositionNodeMenu();
};

export function repositionNodeMenu() {
    const lastNode = get(selectedNodesStore).items.findLast(() => true)?.id;
    if (lastNode) {
        selectedNodesStore.updatePosition(get(cytoscapeStore)!.$id(lastNode).renderedPosition());
    }
}
