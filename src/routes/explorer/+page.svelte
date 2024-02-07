<h1 id='logo'>Aeon/<span id='title'>BIODIVINE</span></h1>

<div style="position:absolute" id="explorer-witness-panel" class="main-panel gone">
    <img alt="close" src="img/close-24px.svg" class="panel-close-button" onclick="witnessPanelVisible(false)">
            <h2 style="margin: 0 auto; font-size: 20px; text-align: center; margin-bottom: 8px;">Witness update functions</h2>
            <ul id='explorer-update-functions' style='list-style:none'></ul>
        </div>
    </div>
</div>


<!-- A container for the graph vizualization -->
<div id="visjs-container"></div>

<!-- A valuation panel -->
<div style="display:none" id="explorer-valuations"><div id="explorer-valuations-text"></div></div>

<!-- A witness panel -->
<div id="explorer-witness-panel"><div id="explorer-witness-text"><div></div>

<!-- engine address  -->
<div id="engine-address" style="display:none">http://localhost:8000/</div>

<div style="position: absolute;">            
    <div id="side-menu">
        <div class="button-group" onclick='witnessPanelVisible()'>
            <img alt="Update functions" id="side-menu-functions" src="img/functions-48px.svg" class="button" tab-id="tab-functions">
            <span class="hint invisible">Update functions</span>
        </div>  
    </div>

    <div id="loading-indicator" class="invisible"><img src="img/progress.gif"/><br><br>Waiting for server...</div>
</div>