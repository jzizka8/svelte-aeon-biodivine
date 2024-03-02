import type { Stylesheet } from 'cytoscape';

const graphStyles: Stylesheet[] = [
  {
    'selector': 'node',
    'style': {
      'label': 'data(label)',
      // put label in the middle of the node (vertically)
      'text-valign': 'center',
      'width': 'label', 'height': 'label',
      // a rectangle with slightly sloped edges
      'shape': 'round-rectangle',
      // when selecting, do not display any overlay
      'overlay-opacity': 0,
      // other visual styles
      'padding': 12,
      'background-color': '#dddddd',
      'font-family': 'FiraMono',
      'font-size': '12pt',
      'border-width': '1px',
      'border-color': '#bbbbbb',
      'border-style': 'solid',
    }
  },
  {	// When a node is highlighted by mouse, show it with a dashed blue border.
    'selector': 'node.hover',
    'style': {
      'border-width': '2.0px',
      'border-color': '#6a7ea5',
      'border-style': 'dashed',
    }
  },
  {
    'selector': 'node:selected',
    'style': {
      'border-width': '2.0px',
      'border-color': '#6a7ea5',
      'border-style': 'solid',
    }
  },
  {
    'selector': 'edge',
    'style': {
      'width': 3.0,
      'curve-style': 'bezier',
      'loop-direction': '-15deg',
      'loop-sweep': '30deg',
      'text-outline-width': 2.3,
      'text-outline-color': '#cacaca',
      'font-family': 'FiraMono',
    }
  },
  {
    'selector': 'edge.hover',
    'style': { 'overlay-opacity': 0.1 },
  },
  {	// Show non-observable edges as dashed
    'selector': 'edge[observable]',
    'style': {
      'line-style': (edge) => { if (edge.data().observable) { return "solid"; } else { return "dashed"; } },
      'line-dash-pattern': [8, 3],
    }
  },
  {	// When the edge is an activation, show it as green with normal arrow
    'selector': 'edge[monotonicity="activation"]',
    'style': {
      'line-color': '#4abd73',
      'target-arrow-color': '#4abd73',
      'target-arrow-shape': 'triangle'
    }
  },
  {	// When the edge is an inhibition, show it as red with a `tee` arrow
    'selector': 'edge[monotonicity="inhibition"]',
    'style': {
      'line-color': '#d05d5d',
      'target-arrow-color': '#d05d5d',
      'target-arrow-shape': 'tee',
    }
  },
  {	// When the edge has unspecified monotonicity, show it as grey with normal arrow
    'selector': 'edge[monotonicity="unspecified"]',
    'style': {
      'line-color': '#797979',
      'target-arrow-color': '#797979',
      'target-arrow-shape': 'triangle',
    }
  },
  {	// A selected edge should be drawn with an overlay
    'selector': 'edge:selected',
    'style': {
      'overlay-opacity': 0.1,
    }
  },
  {	// Edge handles pseudo-node for adding
    'selector': '.eh-handle',
    'style': {
      'width': '32px',
      'height': '32px',
      'shape': 'rectangle',
      'background-opacity': 0,
      'background-image': function (e) {
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(_add_box_svg);
      },
      'background-width': '32px',
      'background-height': '32px',
      'padding': 0,
      'overlay-opacity': 0,
      'border-width': 0,
      'border-opacity': 0,
    }
  },
  {	// Change ghost edge preview colors
    'selector': '.eh-preview, .eh-ghost-edge',
    'style': {
      'background-color': '#797979',
      'line-color': '#797979',
      'target-arrow-color': '#797979',
      'target-arrow-shape': 'triangle',
    }
  },
  {	// Hide ghost edge when a snapped preview is visible
    'selector': '.eh-ghost-edge.eh-preview-active',
    'style': { 'opacity': 0 }
  }
]
export default graphStyles;