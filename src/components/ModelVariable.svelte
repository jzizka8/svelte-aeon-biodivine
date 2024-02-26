<script lang="ts">
	import { liveModelStore } from '../stores/liveModelStore';
	const LiveModel = liveModelStore;
</script>

<div id="model-variable-template" class="model-variable">
	<div class="invisible-input">
		<input
			class="variable-name"
			type="text"
			name="variable-name"
			value="Variable name"
			placeholder="(variable name)"
			style="font-size: 18px;"
			spellcheck="false"
			autocorrect="off"
		/>
	</div>
	<img alt="Remove variable" src="img/delete-24px.svg" class="model-variable-remove button" />
	<img alt="Show variable" src="img/search-24px.svg" class="model-variable-show button" />
	<br />
	<h4>● Regulators</h4>
	<div class="model-variable-regulators full-line" />
	<h4>● Update Function</h4>
	<div
		class="invisible-input full-line variable-function"
		contenteditable
		data-placeholder="(default)"
		spellcheck="false"
		autocorrect="off"
		style="font-size: 16px; text-align: center;"
	/>
	<div class="variable-function-status" />
</div>

<div id="model-regulation-template" class="model-regulation">
	<span class="model-regulation-regulator">Some name</span>
	<span class="model-regulation-short">(->)</span>
	<span class="model-regulation-observable">observable</span>
	<span class="model-regulation-monotonicity">activation</span>
</div>
