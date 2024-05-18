<div id="tab-help" class="main-panel" style="font-family: 'FiraMono';">
	<slot />
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		About & Help
	</h2>

	<p>
		Aeon is a tool for analysing <b style="font-family: 'FiraMonoBold';"
			>long-term behaviour of Boolean networks with parameters</b
		>. Use the editor to create a new network, or import your own from .sbml or .aeon. You can leave
		the update functions in the network blank (this will automatically consider all admissible
		instantiations of such function) or specify an exact update function. In the update function,
		you can use
		<b style="font-family: 'FiraMonoBold';">arbitrary uninterpreted functions as parameters</b>
		(see Budding Yeast-Irons example). Aeon will then automatically consider all admissible instantiations
		of such functions when analysing the model.
	</p>

	<p>
		Once your network is ready, you can run the long-term behaviour analysis which will show you the
		behaviour classes of the model. The classes are separated based on <b
			style="font-family: 'FiraMonoBold';">stable, oscillating or disordered</b
		>
		behaviour. For each class, you can generate a
		<b style="font-family: 'FiraMonoBold';">witness network</b> that exihibits the specified behaviour.
	</p>

	<h3>Manual</h3>

	Full description of the functionality Aeon provides is available in the<a
		href="https://biodivine.fi.muni.cz/aeon/manual/v0.4.0/">tool manual</a
	>.

	<h3>Quick Help</h3>
	<b>Network editor actions:</b>
	<ul>
		<li>Double click to create a new variable.</li>
		<li>Drag from `+` to create a new regulation.</li>
		<li>Select element (click) to show the context menu.</li>
	</ul>
	<b>Keyboard shortcuts:</b>
	<ul>
		<li>(⌫) Remove selected element.</li>
		<li>(N) Add new variable.</li>
		<li>(E) Edit name of the selected variable.</li>
		<li>(F) Edit update function of the selected variable.</li>
		<li>(O) Change observability of the selected regulation.</li>
		<li>(M) Change monotonicity of the selected regulation.</li>
		<li>(H) Show this help message.</li>
	</ul>

	<h3>Attributions</h3>

	<p>Compute Engine: crossbeam, rayon, rocket, json.</p>

	<p>Online client: SvelteKit, cytoscape with edgehandles, material icons, hotkeys.</p>
</div>
