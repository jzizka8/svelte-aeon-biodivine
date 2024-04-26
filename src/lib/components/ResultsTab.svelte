

<div id="tab-results" class="main-panel">
	<slot />
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		Bifurcation Function
	</h2>
	<div style="text-align: center; padding: 12px;">
		<span id="results-expired" class="orange center gone"
			>The computation has been overwritten. <br />These results are no longer available!</span
		>
	</div>
	<div id="results">
		<div style="text-align: center; width: 350px; margin: 0 auto;">
			No results loaded. Run analysis to show bifurcation function overview for the currently loaded
			model.
		</div>
	</div>
	<div id="open-tree-explorer" class="gone" style="text-align: center; margin: 8px;">
		<a class="inline-button" >
			&gt;&gt; Explore Bifurcation Function &lt;&lt;
		</a>
	</div>
	<div id="result-legend">
		<span class="table-behavior">D</span> disorder | <span class="table-behavior">O</span>
		oscillation | <span class="table-behavior">S</span> stability
	</div>
</div>
