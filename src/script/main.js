import hotkeys from 'hotkeys-js';
import ComputeEngine from './ComputeEngine';
import LiveModel from './LiveModel';
import CytoscapeEditor from './CytoscapeEditor';
import { modelEditorStore as ModelEditor } from '$lib/stores/ModelEditorStore';
import UI from './UI';
import Messages from './messages';
import { get } from 'svelte/store';
import { activeTabStore } from '$lib/stores/activeTabStore';

export function init() {
	console.log('Initializing AEON');
	// Safari security alert
	let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (isSafari) {
		alert(
			'At the moment, security measures in Safari may prevent you from connecting to the AEON compute engine.\n\n' +
				'You can still use the editor to view, modify and export models. While we work on this issue, you ' +
				'can access full AEON functionaliy in Google Chrome.'
		);
	}

	// Warn user that there is an unsaved model.
	window.onbeforeunload = function (e) {
		if (LiveModel.isEmpty()) {
			// Only warn when the model is not empty.
			return;
		}

		e = e || window.event;

		// In fact, most browsers will not display the text for security
		// reasons, but we have to return some text anyway.

		// For IE and Firefox prior to version 4
		if (e) {
			e.returnValue = Messages.closePrompt;
		}

		// For Safari
		return Messages.closePrompt;
	};

	// Set engine address according to query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const engineAddress = urlParams.get('engine');
	if (engineAddress !== undefined && engineAddress !== null && engineAddress.length > 0) {
		document.getElementById('engine-address').value = engineAddress;
	}

	UI.init();
	get(ModelEditor).init();
	CytoscapeEditor.init();
	ComputeEngine.openConnection(); // Try to automatically connect when first opened.

	let witnessCallback = function (e, r) {
		UI.isLoading(false);
		if (e !== undefined) {
			alert(e);
		} else {
			let error = LiveModel.importAeon(r.model);
			if (error !== undefined) {
				alert(error);
			}
			activeTabStore.set('model-editor');
		}
	};

	const requestedWitness = urlParams.get('witness');
	if (requestedWitness !== undefined && requestedWitness !== null && requestedWitness.length > 0) {
		UI.isLoading(true);
		ComputeEngine.getWitness(requestedWitness, witnessCallback, true);
	}

	const requestedTreeWitness = urlParams.get('tree_witness'); // Should be a node id.
	if (requestedTreeWitness !== undefined && requestedTreeWitness !== null) {
		UI.isLoading(true);
		const requestedVariable = urlParams.get('variable');
		const requestedBehaviour = urlParams.get('behaviour');
		const requestedVector = urlParams.get('vector');
		if (requestedVariable === undefined || requestedVariable === null || requestedVector === null) {
			ComputeEngine.getTreeWitness(requestedTreeWitness, witnessCallback, true);
		} else {
			// This is attractor stability query
			ComputeEngine._backendRequest(
				'/get_stability_witness/' +
					requestedTreeWitness +
					'/' +
					encodeURI(requestedBehaviour) +
					'/' +
					encodeURI(requestedVariable) +
					'/' +
					encodeURI('[' + requestedVector + ']'),
				witnessCallback,
				'GET',
				null
			);
		}
	}
}

/* This can be used to properly show placeholder for content editable stuff */
function fixEmptyEditable(e) {
	if (e.target.textContent.trim().length === 0) {
		e.target.textContent = '';
	}
}

export function ensurePlaceholder(el) {
	el.addEventListener('focusout', fixEmptyEditable);
}

/*
	"Data types":
	id: Number
	regulation: {
		regulator: Id,
		target: Id,
		observable: bool,
		monotonicity: string from EdgeMonotonicity
	}
*/

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
