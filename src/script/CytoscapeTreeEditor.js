import cytoscape from 'cytoscape';
import cytoscapeDagre from 'cytoscape-dagre';
import { removeNode } from './treeExplorerMain';
import { activeTabStore } from '$lib/stores/activeTabStore';
import { decisionStore, mixedDataStore, leafDataStore } from '$lib/stores/treeNodeStores';

/*
	Responsible for managing the cytoscape editor object. It has its own representation of the graph,
	but it should never be updated directly. Instead, always use LiveModel to specify updates.
*/
export const CytoscapeEditor = {
	// Reference to the cytoscape library "god object"
	_cytoscape: undefined,
	_totalCardinality: 0.0,
	_showMass: false,

	init: function () {
		this._cytoscape = cytoscape(this.initOptions());
		cytoscape.use(cytoscapeDagre);
		this._cytoscape.on('select', (e) => {
			document.getElementById('quick-help').classList.add('gone');
			console.log(e.target.data());
			let data = e.target.data();
			if (data.type == 'leaf') {
					this._showLeafPanel(data);
					activeTabStore.set('leaf');
				} else if (data.type == 'decision') {
					activeTabStore.set('decision');
					this._showDecisionPanel(data);
				} else if (data.type == 'unprocessed') {
					activeTabStore.set('mixed');
					this._showMixedPanel(data);
				}
		});
		this._cytoscape.on('unselect', (e) => {
			// Clear remove button
			activeTabStore.close();
		});
	},

	removeAll() {
		CytoscapeEditor._cytoscape.nodes(':selected').unselect(); // Triggers reset of other UI.
		CytoscapeEditor._cytoscape.elements().remove();
	},

	// Triggers all necessary events to update UI after graph update
	refreshSelection(targetId) {
		let selected = CytoscapeEditor._cytoscape.$(':selected'); // node or edge that are selected
		if (selected.length > 0) {
			selected.unselect();
		}
		if (targetId === undefined) {
			if (selected.length > 0) {
				selected.select();
			}
		} else {
			CytoscapeEditor._cytoscape.getElementById(targetId).select();
		}
	},

	getParentNode(targetId) {
		let parentEdge = CytoscapeEditor._cytoscape.edges("edge[target='" + targetId + "']");
		if (parentEdge.length == 0) {
			return undefined;
		}
		return parentEdge.data().source;
	},

	getChildNode(sourceId, positive) {
		let childEdge = CytoscapeEditor._cytoscape.edges(
			"edge[source='" + sourceId + "'][positive='" + positive + "']"
		);
		if (childEdge.length == 0) {
			return undefined;
		}
		return childEdge.data().target;
	},

	getSiblingNode(targetId) {
		let parentEdge = CytoscapeEditor._cytoscape.edges("edge[target='" + targetId + "']");
		if (parentEdge.length == 0) {
			return undefined;
		}
		let sourceId = parentEdge.data().source;
		let positive = !(parentEdge.data().positive == 'true');
		let childEdge = CytoscapeEditor._cytoscape.edges(
			"edge[source='" + sourceId + "'][positive='" + positive + "']"
		);
		if (childEdge.length == 0) {
			return undefined;
		}
		return childEdge.data().target;
	},

	getSelectedNodeId() {
		const node = CytoscapeEditor._cytoscape.nodes(':selected');
		if (node.length == 0) return undefined;
		return node.data().id;
	},

	getSelectedNodeTreeData() {
		const node = CytoscapeEditor._cytoscape.nodes(':selected');
		if (node.length == 0) return undefined;
		return node.data().treeData;
	},

	selectNode(nodeId) {
		let current = CytoscapeEditor._cytoscape.nodes(':selected');
		current.unselect();
		CytoscapeEditor._cytoscape.getElementById(nodeId).select();
	},

	getNodeType(nodeId) {
		return CytoscapeEditor._cytoscape.getElementById(nodeId).data().type;
	},

	_showDecisionPanel(data) {
		decisionStore.set(data.treeData);
	},

	_showMixedPanel(data) {
		mixedDataStore.set(data.treeData);
	},

	_showLeafPanel(data) {
		let conditions = this.computeConditions(data.id);
		leafDataStore.set({
			conditions,
			totalCardinality: this._totalCardinality,
			behavior: data.label,
			...data.treeData
		});
	},
	computeConditions(pathId) {
		const conditionsList = [];
		let source = this._cytoscape.edges(`[target = "${pathId}"]`);

		while (source.length !== 0) {
			let data = source.data();
			let attribute = this._cytoscape.getElementById(data.source).data().treeData.attribute_name;
			conditionsList.push({ attribute, isPositive: data.positive === 'true' });

			source = this._cytoscape.edges(`[target = "${data.source}"]`);
		}

		return conditionsList;
	},
	initOptions: function () {
		return {
			container: document.getElementById('cytoscape-editor'),
			boxSelectionEnabled: false,
			selectionType: 'single',
			style: [
				{
					// Style of the graph nodes
					selector: 'node[label]',
					style: {
						//
						label: 'data(label)',
						// put label in the middle of the node (vertically)
						'text-valign': 'center',
						width: 'label',
						height: 'label',
						shape: 'round-rectangle',
						// when selecting, do not display any overlay
						'overlay-opacity': 0,
						opacity: 'data(opacity)',
						// other visual styles
						padding: '12',
						'background-color': '#dddddd',
						//'background-opacity': '0',
						'font-family': 'FiraMono',
						'font-size': '12pt',
						'border-width': '1px',
						'border-color': '#bbbbbb',
						'border-style': 'solid',
						'text-max-width': 150,
						'text-wrap': 'wrap'
					}
				},
				{
					selector: '.remove-button',
					style: {
						'text-valign': 'top',
						'text-halign': 'right',
						shape: 'round-rectangle',
						'background-opacity': 0,
						'background-image': function (e) {
							return 'data:image/svg+xml;utf8,' + encodeURIComponent(_remove_svg);
						},
						'background-width': '24px',
						'background-height': '24px',
						width: '32px',
						height: '32px'
					}
				},
				{
					selector: '.remove-button.hover',
					style: {
						'background-width': '32px',
						'background-height': '32px'
					}
				},
				{
					// When a node is selected, show it with a thick blue border.
					selector: 'node:selected',
					style: {
						'border-width': '4.0px',
						'border-color': '#6a7ea5',
						'border-style': 'solid'
					}
				},
				{
					selector: 'node[type = "unprocessed"]',
					style: {
						'background-color': '#EFEFEF',
						'border-color': '#616161'
					}
				},
				{
					selector: 'node[type = "leaf"]',
					style: {
						'border-color': '#546E7A',
						'font-family': 'symbols',
						'font-size': '16pt'
					}
				},
				{
					selector: 'node[subtype = "disorder"]',
					style: {
						'background-color': '#FFE0B2'
					}
				},
				{
					selector: 'node[subtype = "oscillation"]',
					style: {
						'background-color': '#F0F4C3'
					}
				},
				{
					selector: 'node[subtype = "stability"]',
					style: {
						'background-color': '#B2DFDB'
					}
				},
				{
					selector: 'edge',
					style: {
						'curve-style': 'taxi',
						'taxi-direction': 'vertical',
						'target-arrow-shape': 'triangle'
					}
				},
				{
					selector: 'edge[positive = "true"]',
					style: {
						'line-color': '#4abd73',
						'target-arrow-color': '#4abd73'
					}
				},
				{
					selector: 'edge[positive = "false"]',
					style: {
						'line-color': '#d05d5d',
						'target-arrow-color': '#d05d5d'
					}
				}
				/*{
  					'selector': 'node[type="decision"]'
  				} */
			]
		};
	},

	ensureNode(treeData) {
		let node = this._cytoscape.getElementById(treeData.id);
		if (node !== undefined && node.length > 0) {
			let data = node.data();
			this._applyTreeData(data, treeData);
			this._cytoscape.style().update(); //redraw graph
			return node;
		} else {
			let data = this._applyTreeData({ id: treeData.id }, treeData);
			return this._cytoscape.add({
				id: data.id,
				data: data,
				grabbable: false,
				position: { x: 0.0, y: 0.0 }
			});
		}
	},

	ensureEdge(sourceId, targetId, positive) {
		let edge = this._cytoscape.edges('[source = "' + sourceId + '"][target = "' + targetId + '"]');
		if (edge.length >= 1) {
			// Edge exists
			this._cytoscape.style().update(); //redraw graph
		} else {
			// Make new edge
			this._cytoscape.add({
				group: 'edges',
				data: { source: sourceId, target: targetId, positive: positive.toString() }
			});
		}
	},

	// Pan and zoom the groph to show the whole model.
	fit() {
		this._cytoscape.fit();
		this._cytoscape.zoom(this._cytoscape.zoom() * 0.8); // zoom out a bit to have some padding
	},
	_normalizeClass(cls) {
		return JSON.parse(cls)
			.map((x) => x[0])
			.sort()
			.join('');
	},
	_applyTreeData(data, treeData) {
		if (data.id != treeData.id) {
			console.error('Updating wrong node.');
		}
		if (treeData.id == '0') {
			this._totalCardinality = treeData.cardinality;
		}
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
		data.treeData = treeData;
		data.type = treeData.type;
		if (treeData.type == 'leaf') {
			let normalizedClass = this._normalizeClass(treeData.class);
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
			data.label = treeData.attribute_name;
		} else if (treeData.type == 'unprocessed') {
			data.label = 'Mixed Phenotype\n' + '(' + treeData.classes.length + ' types)';
		} else {
			data.label = treeData.type + '(' + treeData.id + ')';
		}
		let opacity = 1.0;

		data.opacity = opacity;
		return data;
	},

	removeNode(nodeId) {
		let e = this._cytoscape.getElementById(nodeId);
		if (e.length > 0) {
			e.remove();
		}
	},

	applyTreeLayout() {
		this._cytoscape
			.layout({
				name: 'dagre',
				spacingFactor: 1.0,
				roots: [0],
				directed: true,
				avoidOverlap: true,
				nodeDimensionsIncludeLabels: true,
				//animate: true,
				fit: false
			})
			.start();
	}
};

// Modified version of the cancel-24px.svg with color explicitly set to red and an additional background element which makes sure the X is filled.
let _remove_svg =
	'<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M4 6h14v14H6z"/><path fill="#d05d5d" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
