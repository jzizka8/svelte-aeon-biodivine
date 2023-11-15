import { writable } from "svelte/store";
import type { tabType } from "../types/types";

const createActiveTabStore = () => {
    const { subscribe, set } = writable<tabType | null>(null);

    return {
        subscribe,
        set,
        close: () => set(null),
    };
};

export const activeTabStore = createActiveTabStore();

