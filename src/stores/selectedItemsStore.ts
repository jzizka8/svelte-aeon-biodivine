import { writable } from "svelte/store";
import type { Node, Position, Regulation } from "../types/types";

type Identifiable = { id: string };

type Selection<T> = {
    items: T[];
    position: Position | null;
};

function createSelectionStore<T extends Identifiable>() {
    const { subscribe, set, update } = writable<Selection<T>>({ items: [], position: null });

    return {
        subscribe,
        addItem: (item: T, position: Position) => update(selection => {
            if (!selection.items.find(i => i.id === item.id)) {
                return { items: [...selection.items, item], position };
            }
            return { ...selection, position };
        }),
        removeItem: (itemId: string) => update(selection => {
            const updatedItems = selection.items.filter(i => i.id !== itemId);
            return { items: updatedItems, position: selection.position };
        }),
        clear: () => set({ items: [], position: null }),
        updatePosition: (position: Position) => update(selection => {
            return { ...selection, position };
        }),
    };
}

export const selectedNodesStore = createSelectionStore<Node>();
export const selectedEdgesStore = createSelectionStore<Regulation>();