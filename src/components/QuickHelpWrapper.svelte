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

<!--  TODO: should also depent on model editor - show always if empty -->
<div id="quick-help" class="quick-help {hidden ? 'hidden' : ''}">
	<slot></slot>
</div>

