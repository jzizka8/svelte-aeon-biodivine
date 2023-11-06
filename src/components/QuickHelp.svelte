<script lang="ts">
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	let hidden = false;
	//https://www.okupter.com/blog/sveltekit-document-is-not-defined
	onMount(() => {
		hotkeys('h', { keyup: true, keydown: true }, function (event, handler) {
            event.preventDefault();
            hidden = event.type === 'keyup';
		});
	});
</script>

// TODO: should also depent on model editor - show always if empty
<div id="quick-help" class="quick-help {hidden ? 'hidden' : ''}">
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
	<div class="quick-help__footer">
		(this message disappears when you create the first variable)
	</div>
</div>

<style>
.quick-help {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    color: #ffffff;
    background: #333;
    font-size: 1.125rem;
    font-family: 'FiraMono';
    opacity: 0.90;
}

.quick-help__header {
    display: flex;
    justify-content: space-between;
}

.quick-help__header h3 {
    margin: 0;
}

.quick-help__footer {
    font-size: 0.75rem;
    text-align: center;
}

.shortcuts-list li::first-letter{
    font-weight: bold;
    font-size: 1.5em;
}
</style>
