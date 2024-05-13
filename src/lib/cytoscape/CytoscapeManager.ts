import cytoscape from 'cytoscape';
import type { EdgeHandlesInstance, EdgeHandlesOptions } from 'cytoscape-edgehandles';
import cytoscapeEdgehandles from 'cytoscape-edgehandles';
class CytoscapeManager {
	private instance: cytoscape.Core | null;
	private edgehandles: EdgeHandlesInstance | null;

	constructor() {
		this.instance = null;
		this.edgehandles = null;
	}

	initCytoscape(options: cytoscape.CytoscapeOptions): cytoscape.Core {
		if (!this.instance) {
			cytoscape.use(cytoscapeEdgehandles);
			console.log('Initializing Cytoscape...');
			this.instance = cytoscape(options);
		}
		return this.instance;
	}

	initEdgeHandles(options: EdgeHandlesOptions): EdgeHandlesInstance {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}

		this.edgehandles = this.instance.edgehandles(options);
		this.edgehandles.enable();
		return this.edgehandles;
	}

	getInstance() {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		return this.instance;
	}

	getEdgeHandles() {
		if (!this.edgehandles) {
			throw new Error('Edgehandles instance has not been initialized yet.');
		}
		return this.edgehandles;
	}

	getElementById(id: string) {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}
		return this.instance.getElementById(id);
	}

	updateElementData(id: string, attributeName: string, newValue: any) {
		console.log('Updating element data...', id, attributeName, newValue);
		if (!this.instance) {
			return;
		}
		const element = this.instance.$id(id);
		if (!element || !element.data()) {
			return;
		}

		element.data()[attributeName] = newValue;
		this.instance.style().update(); // Redraw graph to reflect the change
	}

	applyLayout() {
		if (!this.instance) {
			return;
		}
		this.instance
			.makeLayout({
				name: 'cose',
				padding: 50,
				animate: 'end',
				animationDuration: 300,
				refresh: 20,
				fit: true,
				nodeDimensionsIncludeLabels: true
			})
			.run();
	}

	collectElementPosition() {
		if (!this.instance) {
			throw new Error('Cytoscape instance has not been initialized yet.');
		}

		return this.instance.nodes().map((node) => ({
			variable: node.data('label'),
			position: node.position()
		}));
	}
}
export const cytoscapeManager = new CytoscapeManager();
