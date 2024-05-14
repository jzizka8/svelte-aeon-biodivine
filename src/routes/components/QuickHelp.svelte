<script lang="ts">
	import QuickHelpWrapper from '$lib/components/QuickHelpWrapper.svelte';
	export let show: boolean;
</script>

<QuickHelpWrapper {show}>
	<div class="quick-help__header">
		<b>Network editor actions:</b>
		<h3>HELP</h3>
	</div>
	<ul>
		<li>Double click to create a new variable.</li>
		<li>Drag from `+` to create a new regulation.</li>
		<li>Select element (click) to show the context menu.</li>
	</ul>
	<b>Keyboard shortcuts:</b>
	<ul class="shortcuts-list">
		<li><span class="shortcut">⌫</span> Remove selected element.</li>
		<li><span class="shortcut">N</span> Add new variable.</li>
		<li><span class="shortcut">E</span> Edit name of the selected variable.</li>
		<li><span class="shortcut">F</span> Edit update function of the selected variable.</li>
		<li><span class="shortcut">O</span> Change observability of the selected regulation.</li>
		<li><span class="shortcut">M</span> Change monotonicity of the selected regulation.</li>
		<li><span class="shortcut">H</span> Show this help message.</li>
	</ul>	
	<div class="quick-help__footer">(this message disappears when you create the first variable)</div>
</QuickHelpWrapper>
