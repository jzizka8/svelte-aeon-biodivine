import { writable } from 'svelte/store';

function createCyStore() {
    const { subscribe, set, update } = writable<cytoscape.Core | null>(null); // Store holding cyInstance
    function updateElementData(id: string, attributeName: string, newValue: any) {
        update(cy => {
            if (!cy) {
                return null;
            }
            const element = cy.getElementById(id);
            if (element) {
                element.data()[attributeName] = newValue;
                cy.style().update(); // Redraw graph to reflect the change
            }
            return cy;
        });
    };
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

        updateNodeLabel(id: string, name: string) {
            updateElementData(id, 'label', name);
        },
        updateEdgeMonotonicity(id: string, monotonicity: string) {
            updateElementData(id, 'monotonicity', monotonicity);
        },
        updateEdgeObservable(id: string, observable: boolean) {
            updateElementData(id, 'observable', observable);
        }
    };
}

export const cytoscapeStore = createCyStore();