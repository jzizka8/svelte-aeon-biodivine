import { writable } from 'svelte/store';

function createCyStore() {
    const { subscribe, set, update } = writable<cytoscape.Core | null>(null); // Store holding cyInstance

    return {
        subscribe,
        set,
        applyLayout() {
            update(cy => {
                if (cy) {
                    cy.makeLayout({
                        name: 'cose',
                        padding: 50,
                        animate: 'end',
                        animationDuration: 300,
                        refresh: 20,
                        fit: true,
                        nodeDimensionsIncludeLabels: true
                    }).run();
                }
                return cy; // Return the current instance
            });
        },
        // You can add more methods here as needed
    };
}

export const cytoscapeStore = createCyStore();