import type { Stylesheet } from 'cytoscape';

const graphStyles: Stylesheet[] = [
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
];

export default graphStyles;