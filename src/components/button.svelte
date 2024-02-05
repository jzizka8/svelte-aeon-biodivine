<script>
	export let text = 'Button';
	export let disabled = false;
	export let onClick = () => {};
</script>

<button on:click={onClick} {disabled}>
	{text}
</button>

<style>
	button {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 12px 24px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 4px;
	}

	button:hover {
		background-color: #3e8e41;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
