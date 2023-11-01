<div id="side-menu">
    <div class="button-group-fake">
        <img alt="Compute Bifurcation" id="side-menu-compute" src="img/play_circle_filled-48px.svg"
            onclick="ComputeEngine.startComputation(LiveModel.exportAeon());" class="button-fake">
        <span class="hint invisible">Start Analysis</span>
    </div>

    <div class="button-group">
        <img alt="Engine" id="side-menu-engine" src="img/engine-48px.svg" class="button" tab-id="tab-engine">
        <span id="engine-dot">●</span>
        <span class="hint invisible">Compute Engine</span>
    </div>

    <div class="button-group">
        <img alt="Import/Export" id="side-menu-import-export" src="img/file_copy-48px.svg" class="button"
            tab-id="tab-import-export">
        <span class="hint invisible">Import / Export</span>
    </div>

    <div class="button-group">
        <img alt="Model" id="side-menu-model" src="img/model-48px.svg" class="button" tab-id="tab-model-editor">
        <span class="hint invisible">Model Editor</span>
    </div>

    <div class="button-group-fake">
        <img alt="Auto Layout" id="side-menu-layout" src="img/view_quilt-48px.svg"
            onclick="CytoscapeEditor.layoutCose();" class="button-fake">
        <span class="hint invisible">Apply Layout</span>
    </div>

    <div class="button-group">
        <img alt="Model" id="side-menu-results" src="img/call_split-48px.svg" class="button"
            tab-id="tab-results">
        <span class="hint invisible">Results</span>
    </div>

    <div class="button-group">
        <img alt="Help" id="side-menu-help" src="img/help-48px.svg" class="button" tab-id="tab-help">
        <span class="hint invisible">About and Help</span>
    </div>
</div>