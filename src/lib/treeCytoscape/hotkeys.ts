import { selectedTreeNodeId } from '$lib/stores/treeNodeStores';
import hotkeys from 'hotkeys-js';
import { get } from 'svelte/store';
import { getParentNode, getSiblingNode, getChildNode } from './cyHelpers';
import { treeCytoscapeManager } from './treeCytoscapeManager';

function getHotkeyActions(cy: cytoscape.Core): {
	[key: string]: (nodeId: number) => number | undefined;
} {
	return {
		up: (parent) => getParentNode(cy, parent),
		left: (sibling) => getSiblingNode(cy, sibling),
		right: (sibling) => getSiblingNode(cy, sibling),
		down: (child) => getChildNode(cy, child, 'true'),
		'shift+down': (child) => getChildNode(cy, child, 'false')
	};
}
export function initHotkeys(cy: cytoscape.Core) {
	const hotkeyActions = getHotkeyActions(cy);

	function navigate(direction: string, event: Event) {
		const selected = get(selectedTreeNodeId);
		if (selected === undefined) {
			treeCytoscapeManager.selectNode(0);
		} else {
			const targetNode = hotkeyActions[direction](selected);
			if (targetNode === undefined) {
				return;
			}
			treeCytoscapeManager.selectNode(targetNode);
			event.preventDefault();
		}
	}

	// Attach hotkeys using the actions
	Object.keys(hotkeyActions).forEach((key) => {
		hotkeys(key, function (event) {
			navigate(key, event);
		});
	});
}

export function unbindHotkeys() {
	// Assuming hotkeys.unbind function exists and works without needing cy
	Object.keys(getHotkeyActions({} as cytoscape.Core)).forEach((key) => {
		hotkeys.unbind(key);
	});
}
