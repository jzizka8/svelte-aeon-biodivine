<script>
	import SideMenuItem from './SideMenuItem.svelte';
</script>

<div id="side-menu">
	<ul>
		<button 
			class="button  nav__item button--green "
			title="You need to connect compute eninge in order to start analysis"
		>
			<img src="img/play_circle_filled-48px.svg" alt="" /> Start Analysis
		</button>
		<button class="button nav__item "><img src="img/view_quilt-48px.svg" alt="" /> Apply Layout</button>
	</ul>
	<nav>
		<ul>
			<li class="nav__item"><img src="img/engine-48px.svg" alt="" /> Compute Engine</li>
			<li class="nav__item"><img src="img/file_copy-48px.svg" alt="" /> Import / Export</li>
			<li class="nav__item"><img src="img/model-48px.svg" alt="" /> Model Editor</li>
			<li class="nav__item"><img src="img/call_split-48px.svg" alt="" /> Results</li>
			<li class="nav__item"><img src="img/help-48px.svg" alt="" /> About</li>
		</ul>
	</nav>
</div>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1.25rem;
		padding-left: 0;
	}
    nav{
        margin-top: 6rem;
    }
	.nav__item {
		padding: 1rem 0.75rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 1rem;
	}
	.nav__item:hover,
	.nav__item.active {
		background-color: var(--primary-color-light);
        color: white;
		cursor: pointer;
	}
	
	.nav__item img {
		width: 2rem;
		height: 2rem;
		margin-right: 0.5rem;
	}

    .button {
        border:none;
		background-color:var(--primary-color-light);
		color: white;
        font-size: 1.25rem;
        padding-inline: 1rem;
	}
	.button:hover {
		background-color:var(--primary-color);
	}
	.button.disabled {
		background-color: gray;
		color: black;
		opacity: 0.5;
		pointer-events: none;
	}

	.button img, .nav__item:hover img {
		filter: invert(1);
	}
    .button--green{
        background-color: var(--green-light) ;
    }
    .button--green:hover{
        background-color: var(--green) ;
    }
</style>
