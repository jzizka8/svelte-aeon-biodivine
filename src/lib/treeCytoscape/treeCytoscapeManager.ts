import cytoscape from 'cytoscape';
import type { TreeData } from '$lib/types/treeExplorerTypes';
import { createTreeNode } from './cyHelpers';

class TreeCytoscapeManager {
	private instance: cytoscape.Core | null;

	constructor() {
		this.instance = null;
	}

	initCytoscape(options: cytoscape.CytoscapeOptions): cytoscape.Core {
		if (!this.instance) {
			console.log('Initializing Cytoscape...');
			this.instance = cytoscape(options);
		}
		return this.instance;
	}

	getInstance() {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		return this.instance;
	}

	ensureNode(treeData: TreeData) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		const node = this.instance.getElementById(treeData.id.toString());
		if (node.length > 0) {
			const data = createTreeNode(treeData);
			node.data(data);
			this.instance.style().update(); //redraw graph
			return node;
		}
		const data = createTreeNode(treeData);
		return this.instance.add({
			// id: data.id,
			data,
			grabbable: false,
			position: { x: 0.0, y: 0.0 }
		});
	}
	selectNode(nodeId: number) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}

		this.unselectAnyNodes();
		this.instance.getElementById(nodeId.toString()).select();
	}
	unselectAnyNodes() {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}

		this.instance.nodes(':selected').unselect();
	}
	unselectNode(nodeId: number | undefined) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		if (nodeId === undefined) {
			return;
		}

		this.instance.getElementById(nodeId.toString()).unselect();
	}
	ensureEdge(sourceId: number, targetId: number, positive: boolean) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		const edge = this.instance.edges('[source = "' + sourceId + '"][target = "' + targetId + '"]');
		if (edge.length >= 1) {
			// Edge exists
			this.instance.style().update(); //redraw graph
		} else {
			// Make new edge
			this.instance.add({
				group: 'edges',
				data: { source: sourceId, target: targetId, positive: positive.toString() }
			});
		}
	}

	populateCytoscape(nodesTreeData: TreeData[]) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		for (const node of nodesTreeData) {
			this.ensureNode(node);
		}
		for (const node of nodesTreeData) {
			if (node.type == 'decision' && node.left && node.right) {
				this.ensureEdge(node.id, node.left, false);
				this.ensureEdge(node.id, node.right, true);
			}
		}
		this.applyTreeLayout();
	}

	removeSingleNode(nodeId: string) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		const e = this.instance.getElementById(nodeId);
		if (e.length > 0) {
			e.remove();
		}
	}

	removeAll(): void {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		this.instance.nodes(':selected').unselect(); // Triggers reset of other UI.
		this.instance.elements().remove();
	}

	applyTreeLayout() {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		this.instance
			.layout({
				name: 'dagre',
				roots: [0],
				directed: true,
				avoidOverlap: true,
				animate: true,
				fit: true
			})
			.start();
		this.instance.fit();
		this.instance.zoom(this.instance.zoom() * 0.8);
	}
}

export const treeCytoscapeManager = new TreeCytoscapeManager();
