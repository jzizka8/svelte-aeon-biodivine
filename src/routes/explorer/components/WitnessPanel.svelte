<script lang="ts">
	import { witnessPanelVisible } from '../../../script/explorerMain';
	
</script>

<div style="position:absolute" id="explorer-witness-panel" class="main-panel gone">
	<img
		alt="close"
		src="img/close-24px.svg"
		class="panel-close-button"
		on:click={()=>witnessPanelVisible(false)}
	/>
	<h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">
		Witness update functions
	</h2>
	<ul id="explorer-update-functions" style="list-style:none" />
</div>

