<script lang="ts">
	import QuickHelpWrapper from "../../../components/QuickHelpWrapper.svelte";

</script>

<QuickHelpWrapper>

    <h3 style=" margin: 0 auto; ">HELP</h3>
    <b>Tree editor navigation:</b>
    <ul class="shortcuts-list">
        <li>↑ Select parent node.</li>
        <li>↓ Select positive child.</li>
        <li>Shift + ↓ Select negative child.</li>
        <li>←/→ Switch positive/negative branch.</li>
    </ul>
    <b>Tree actions:</b>
    <ul class="shortcuts-list">
        <li>⌫ Remove selected node.</li>
        <li>S Run stability analysis for the selected node.</li>
        <li>D Compute decision attributes for the selected node.</li>
        <li>H Toggle this help message.</li>
    </ul>
    <b>Units:</b>
    <ul>
        <li>Witness count: Number of fully instantiated networks.</li>
        <li>(%): Percentage of networks in the node, i.e. count/total*100.</li>
        <li>(٪): Log-percentage of networks, i.e. log(count)/log(total)*100.</li>
    </ul>

    <div style="width: 100%; text-align: center; font-size: 12px;">
        (this message disappears when you select some element)
    </div>
</QuickHelpWrapper>