import type { EdgeHandlesOptions } from "cytoscape-edgehandles";
import { EdgeMonotonicity } from "../../../types/types";

const edgeOptions: EdgeHandlesOptions = {
    snap: false,
    snapThreshold: 50,
    snapFrequency: 15,
    noEdgeEventsInDraw: false,
    disableBrowserGestures: true,
   
    // Initialize edge with default parameters
    edgeParams: function (sourceNode, targetNode) {
        return { data: { observable: true, monotonicity: EdgeMonotonicity.unspecified } };
    },
    canConnect: function (sourceNode, targetNode) {
        return true;
    }

}

export default edgeOptions;