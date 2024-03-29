<script>
	import QuickHelpWrapper from '$lib/components/QuickHelpWrapper.svelte';
</script>

<QuickHelpWrapper>
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
		<li>⌫ Remove selected element.</li>
		<li>N Add new variable.</li>
		<li>E Edit name of the selected variable.</li>
		<li>F Edit update function of the selected variable.</li>
		<li>O Change observability of the selected regulation.</li>
		<li>M Change monotonicity of the selected regulation.</li>
		<li>H Show this help message.</li>
	</ul>
	<div class="quick-help__footer">(this message disappears when you create the first variable)</div>
</QuickHelpWrapper>
