import hotkeys from 'hotkeys-js';
import ComputeEngine from './ComputeEngine';
import { CytoscapeEditor } from './CytoscapeTreeEditor';
import {
	SORT_ALPHABETICAL,
	SORT_INFORMATION_GAIN,
	SORT_NEGATIVE,
	SORT_NEGATIVE_MAJORITY,
	SORT_POSITIVE,
	SORT_POSITIVE_MAJORITY,
	SORT_TOTAL_CLASSES
} from '$lib//const';

export function Math_dimPercent(cardinality, total) {
	return Math.round(((Math.log2(cardinality) + 1) / (Math.log2(total) + 1)) * 100);
}

export function Math_percent(cardinality, total) {
	return Math.round((cardinality / total) * 100);
}

export function init() {
	// Set engine address according to query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const engineAddress = urlParams.get('engine');
	console.log(engineAddress);
	ComputeEngine.openConnection(undefined, engineAddress);

	CytoscapeEditor.init();

	document.fonts.load('1rem "symbols"').then(() => {
		document.fonts.load('1rem "FiraMono"').then(() => {
			loadBifurcationTree();
		});
	});

	initHotkeys();
}

export function autoExpandBifurcationTree(node, depth, fit = true) {
	let loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.autoExpandBifurcationTree(node, depth, (e, r) => {
		if (r !== undefined && r.length > 0) {
			for (let node of r) {
				CytoscapeEditor.ensureNode(node);
			}
			for (let node of r) {
				if (node.type == 'decision') {
					CytoscapeEditor.ensureEdge(node.id, node.left, false);
					CytoscapeEditor.ensureEdge(node.id, node.right, true);
				}
			}

			CytoscapeEditor.applyTreeLayout();
			if (fit) {
				CytoscapeEditor.fit();
			}
		} else {
			alert(e);
		}
		loading.classList.add('invisible');
		CytoscapeEditor.refreshSelection();
	});
}

function loadBifurcationTree(fit = true) {
	let loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.getBifurcationTree((e, r) => {
		if (r !== undefined && r.length > 0) {
			CytoscapeEditor.removeAll(); // remove old tree if present
			for (let node of r) {
				CytoscapeEditor.ensureNode(node);
			}
			for (let node of r) {
				if (node.type == 'decision') {
					CytoscapeEditor.ensureEdge(node.id, node.left, false);
					CytoscapeEditor.ensureEdge(node.id, node.right, true);
				}
			}

			CytoscapeEditor.applyTreeLayout();
			if (fit) {
				CytoscapeEditor.fit();
			}
		}
		loading.classList.add('invisible');
	}, true);
}

export function setPrecision(precision) {
	let loading = document.getElementById('loading-indicator');
	loading.classList.remove('invisible');
	ComputeEngine.applyTreePrecision(precision, (e, r) => {
		loadBifurcationTree(false);
	});
}

function removeNode(nodeId) {
	ComputeEngine.deleteDecision(nodeId, (e, r) => {
		console.log(r);
		if (r.removed.length > 0) {
			for (let removed of r.removed) {
				CytoscapeEditor.removeNode(removed);
			}
		}
		if (r.node !== undefined) {
			CytoscapeEditor.ensureNode(r.node);
			CytoscapeEditor.refreshSelection(r.node.id);
		}
	});
}

export function selectAttribute(node, attr) {
	ComputeEngine.selectDecisionAttribute(node, attr, (e, r) => {
		console.log(r);
		for (let node of r) {
			CytoscapeEditor.ensureNode(node);
		}
		for (let node of r) {
			if (node.type == 'decision') {
				CytoscapeEditor.ensureEdge(node.id, node.left, false);
				CytoscapeEditor.ensureEdge(node.id, node.right, true);
			}
		}
		CytoscapeEditor.applyTreeLayout();
		CytoscapeEditor.refreshSelection();
	});
}

/* Open witness network for the currently selected tree node. */
function openTreeWitness() {
	let node = CytoscapeEditor.getSelectedNodeId();
	if (node === undefined) {
		return;
	}
	const url = window.location.pathname.replace('treeExplorer', '/');
	window.open(
		url + '?engine=' + encodeURI(ComputeEngine.getAddress()) + '&tree_witness=' + encodeURI(node)
	);
}

function openStabilityWitness(variable, behaviour, vector) {
	let node = CytoscapeEditor.getSelectedNodeId();
	if (node === undefined) {
		return;
	}
	const url = window.location.pathname.replace('treeExplorer', '/');
	window.open(
		url +
			'?engine=' +
			encodeURI(ComputeEngine.getAddress()) +
			'&tree_witness=' +
			encodeURI(node) +
			'&variable=' +
			encodeURI(variable) +
			'&behaviour=' +
			encodeURI(behaviour) +
			'&vector=' +
			encodeURI(vector)
	);
}

/* Open attractors for the currently selected tree node. */
function openTreeAttractor() {
	let node = CytoscapeEditor.getSelectedNodeId();
	if (node === undefined) {
		return;
	}
	const url = window.location.pathname.replace('treeExplorer/', 'explorer/');
	window.open(
		url + '?engine=' + encodeURI(ComputeEngine.getAddress()) + '&tree_witness=' + encodeURI(node)
	);
}

function openStabilityAttractor(variable, behaviour, vector) {
	let node = CytoscapeEditor.getSelectedNodeId();
	if (node === undefined) {
		return;
	}
	const url = window.location.pathname.replace('treeExplorer/', 'explorer/');
	window.open(
		url +
			'?engine=' +
			encodeURI(ComputeEngine.getAddress()) +
			'&tree_witness=' +
			encodeURI(node) +
			'&variable=' +
			encodeURI(variable) +
			'&behaviour=' +
			encodeURI(behaviour) +
			'&vector=' +
			encodeURI(vector)
	);
}

function vector_to_string(vector) {
	let result = '[';
	let first = true;
	for (let item of vector) {
		if (first) {
			first = false;
		} else {
			result += ',';
		}
		if (item == 'true') {
			result += "<span class='green'><b>true</b></span>";
		} else if (item == 'false') {
			result += "<span class='red'><b>false</b></span>";
		} else {
			result += '<b>' + item + '</b>';
		}
	}
	result += ']';
	return result;
}


function getWitnessPanelForVariable(variable, behaviour, vector) {
	return (
		"<span class='witness-panel'><span class='inline-button' onclick='openStabilityWitness(\"" +
		variable +
		'","' +
		behaviour +
		'","' +
		vector +
		"\");'>Witness</span> | <span class='inline-button' onclick='openStabilityAttractor(\"" +
		variable +
		'","' +
		behaviour +
		'","' +
		vector +
		'");\'>Attractor</span></span>'
	);
}

function initHotkeys() {
	// Keyboard shortcuts for basic navigation:

	hotkeys('up', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected == undefined) {
			CytoscapeEditor.selectNode('0');
		} else {
			let parent = CytoscapeEditor.getParentNode(selected);
			if (parent == undefined) {
				return;
			}
			CytoscapeEditor.selectNode(parent);
			event.preventDefault();
		}
	});

	hotkeys('left', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected == undefined) {
			CytoscapeEditor.selectNode('0');
		} else {
			let sibling = CytoscapeEditor.getSiblingNode(selected);
			if (sibling == undefined) {
				return;
			}
			CytoscapeEditor.selectNode(sibling);
			event.preventDefault();
		}
	});

	hotkeys('right', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected == undefined) {
			CytoscapeEditor.selectNode('0');
		} else {
			let sibling = CytoscapeEditor.getSiblingNode(selected);
			if (sibling == undefined) {
				return;
			}
			CytoscapeEditor.selectNode(sibling);
			event.preventDefault();
		}
	});

	hotkeys('down', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected == undefined) {
			CytoscapeEditor.selectNode('0');
		} else {
			let child = CytoscapeEditor.getChildNode(selected, true);
			if (child == undefined) {
				return;
			}
			CytoscapeEditor.selectNode(child);
			event.preventDefault();
		}
	});

	hotkeys('shift+down', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected == undefined) {
			CytoscapeEditor.selectNode('0');
		} else {
			let child = CytoscapeEditor.getChildNode(selected, false);
			if (child == undefined) {
				return;
			}
			CytoscapeEditor.selectNode(child);
			event.preventDefault();
		}
	});

	hotkeys('backspace', function (event, handler) {
		let selected = CytoscapeEditor.getSelectedNodeId();
		if (selected !== undefined && CytoscapeEditor.getNodeType(selected) == 'decision') {
			event.preventDefault();
			if (confirm('Delete this node?')) {
				removeNode(selected);
			}
		}
	});

}
// utility function to fire events on UI elements - we mainly need it to simulate clicks
function fireEvent(el, etype) {
	if (el.fireEvent) {
		el.fireEvent('on' + etype);
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}
