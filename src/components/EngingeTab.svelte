<script lang="ts" >
    import { EXPECTED_ENGINE_VERSION } from "../const";
	import { activeTabStore } from "../stores/activeTabStore";

    const getDownloadLink = (platform: 'windows'|'linux'|'macos') => {
        return `https://github.com/sybila/biodivine-aeon-server/releases/download/${EXPECTED_ENGINE_VERSION}/aeon-compute-engine-${platform}.zip`;
    }
</script>
<div id="tab-engine" class="main-panel ">
    <slot />
    <h2 style="margin: 0 auto; font-size: 20px; text-align: center;">Compute Engine</h2>
    <div class="invisible-input full-line" style="margin-top: 4px; margin-bottom: 4px; font-size: 16px;">
        <input id="engine-address" class="center" type="text" name="engine-address"
            value="http://localhost:8000" placeholder="(engine address)">
    </div>
    <div style="height: 40px;">
        <h3 id="compute-engine-status" style="float: left; font-family: 'FiraMono'; text-transform: uppercase;">
            ● Disconnected</h3>
        <button id="button-connect" class="image-button"
    on:click={() => ComputeEngine.toggleConnection((e,r) => { if (e !== undefined) alert(e); })}
            style="float: right;">Connect <img src="img/cloud-24px.svg"></button>
            
    </div>
    <div style="clear: both;"></div>

    <!-- Computation status -->
    <div id="computation">
        Computation: <span id="computation-status">(none)</span><br>
        <span>Progress: <span id="computation-progress">unknown</span><br>Discovered classes: <span
                id="computation-classes">-</span></span>

        <div style="margin-top: 16px; text-align: center;">

            <button id="computation-cancel" class="image-button" onclick="ComputeEngine.cancelComputation();"
                style="margin-right: 4px;">Cancel job <img src="img/cancel-24px.svg"></button>

            <button id="computation-download" class="image-button" on:click={()=>activeTabStore.set('results')}
                style="margin-left: 4px;">Show result <img src="img/cloud_download-24px.svg"></button>

        </div>
    </div>

    <div style="clear: both;"></div>
    <div style="text-align: center; margin-top: 48px;">
        <h3 style="margin: 0 auto; font-size: 14px; text-align: center; margin-bottom: 4px;">No engine running?
            Download binary:</h3>
        <a href={getDownloadLink('windows')}
            id="engine-link-windows" target="blank"><button id="download-windows" class="image-button"
                style="display: inline-block; margin: 4px;">Windows <img
                    src="img/windows-24px.svg"></button></a>
        <a href={getDownloadLink('macos')}
            id="engine-link-macos" target="blank"><button id="download-mac" class="image-button"
                style="display: inline-block; margin: 4px;">MacOS <img src="img/macos-24px.svg"></button></a>
        <a href={getDownloadLink('linux')}
            id="engine-link-linux" target="blank"><button id="download-linux" class="image-button"
                style="display: inline-block; margin: 4px;">Linux <img src="img/linux-24px.svg"></button></a>
    </div>
</div>