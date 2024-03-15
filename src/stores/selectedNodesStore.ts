import { writable } from "svelte/store";
import type { Node, Position } from "../types/types";

function createSelectedNodesStore() {
    const { subscribe, set, update } = writable<{ nodes: Node[] } & { position: Position | null }>({ nodes: [], position: null });

    return {
        subscribe,
        addNode: (node: Node, position: Position) => update(selection => {
            if (!selection.nodes.find(n => n.id === node.id)) {
                return { nodes: [...selection.nodes, node], position };
            }
            return { ...selection, position };
        }),
        removeNode: (nodeId: string) => update(selection => {
            const updatedNodes = selection.nodes.filter(n => n.id !== nodeId);
            return { nodes: updatedNodes, position: selection.position };
        }),
        clear: () => set({ nodes: [], position: null }),

        updatePosition: (position: Position) => update(selection => {
            return { ...selection, position };
        }),
    };
}

export const selectedNodesStore = createSelectedNodesStore();
