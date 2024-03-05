<script lang="ts">
    import { onMount, setContext } from 'svelte'
    import cytoscape from 'cytoscape'
    import dagre from 'cytoscape-dagre'
    import GraphStyles from './graphStyles'
  
    setContext('graphSharedState', {
      getCyInstance: () => cyInstance
    })
  
    let refElement: HTMLDivElement;
    let cyInstance: cytoscape.Core;
  
    onMount(() => {
      cytoscape.use(dagre)
  
      cyInstance = cytoscape({
        container: refElement,
        style: GraphStyles
      })
  
      cyInstance.on('add', () => {
        cyInstance
          .makeLayout({
            name: 'cose',
            rankDir: 'TB',
            nodeSep: 150
          })
          .run()
      })
    })
  
  </script>
  
  <div class="graph" bind:this={refElement}>
    {#if cyInstance}
      <slot></slot>
    {/if}
  </div>
  
  <style>
    .graph {
      inset: 0;
    }
    </style>