import ComputeEngine from './ComputeEngine';

export function init() {
	// Safari security alert
	let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (isSafari) {
		alert(
			'At the moment, security measures in Safari may prevent you from connecting to the AEON compute engine.\n\n' +
				'You can still use the editor to view, modify and export models. While we work on this issue, you ' +
				'can access full AEON functionaliy in Google Chrome.'
		);
	}
	ComputeEngine.openConnection(); // Try to automatically connect when first opened.
}
