import type { EdgeHandlesOptions } from "cytoscape-edgehandles";
import { EdgeMonotonicity } from "../../../types/types";

const edgeOptions: EdgeHandlesOptions = {
    preview: true, // whether to show added edges preview before releasing selection
    hoverDelay: 150, // time spent hovering over a target node before it is considered selected
    snap: false,
    snapThreshold: 50,
    snapFrequency: 15,
    noEdgeEventsInDraw: false,
    disableBrowserGestures: true,
    nodeLoopOffset: -50,
    // The `+` button should be drawn on top of each node
    handlePosition: function (node) {
        return 'middle top';
    },
    handleInDrawMode: false,
    edgeType: function (sourceNode, targetNode) {
        return 'flat';
    },
    // Loops are always allowed
    loopAllowed: function (node) {
        return true;
    },
    // Initialize edge with default parameters
    edgeParams: function (sourceNode, targetNode) {
        return { data: { observable: true, monotonicity: EdgeMonotonicity.unspecified } };
    },
    canConnect: function (sourceNode, targetNode) {
        return true;
    }

}

export default edgeOptions;