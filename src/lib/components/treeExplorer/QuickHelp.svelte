<script lang="ts">
	import QuickHelpWrapper from '$lib/components/QuickHelpWrapper.svelte';

	export let show: boolean;
</script>

<QuickHelpWrapper {show}>
	<h3 style=" margin: 0 auto; ">HELP</h3>
	<b>Tree editor navigation:</b>
	<ul class="shortcuts-list">
		<li><span class="shortcut">↑</span> Select parent node.</li>
		<li><span class="shortcut">↓</span> Select positive child.</li>
		<li><span class="shortcut">Shift</span> + <span class="shortcut">↓</span> Select negative child.</li>
		<li><span class="shortcut">←</span>/<span class="shortcut">→</span> Switch positive/negative branch.</li>
	</ul>
	<b>Tree actions:</b>
	<ul class="shortcuts-list">
		<li><span class="shortcut">⌫</span> Remove selected node.</li>
		<li><span class="shortcut">S</span> Run stability analysis for the selected node.</li>
		<li><span class="shortcut">D</span> Compute decision attributes for the selected node.</li>
		<li><span class="shortcut">H</span> Toggle this help message.</li>
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
