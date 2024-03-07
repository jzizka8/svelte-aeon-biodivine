import type { EdgeHandlesOptions } from "cytoscape-edgehandles";
import { modelStoreActions } from "../../../stores/modelStore";
import { EdgeMonotonicity } from "../../../types/types";

const edgeOptions: EdgeHandlesOptions = {
    preview: true, // whether to show added edges preview before releasing selection
    hoverDelay: 150, // time spent hovering over a target node before it is considered selected
    handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
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
    // Add the edge to the live model
    complete: function (sourceNode, targetNode, addedEles) {
        modelStoreActions.createRegulation(sourceNode.id(), targetNode.id());
    }
}

export default edgeOptions;