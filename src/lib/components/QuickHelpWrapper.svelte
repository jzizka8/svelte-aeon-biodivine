<script lang="ts">
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';

	$: keyPressed = false;
	export let show: boolean;

	onMount(() => {
		hotkeys('h', { keyup: true, keydown: true }, function (event, handler) {
			event.preventDefault();
			keyPressed = event.type !== 'keyup';
		});
	});
</script>

<div id="quick-help" class="quick-help" class:hidden={!keyPressed && !show}>
	<slot />
</div>
