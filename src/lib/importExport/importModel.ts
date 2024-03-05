import { EdgeMonotonicity } from "../../types/types";
import { modelStoreActions } from "../../stores/modelStore";

export function importAeon(modelString: string) {

    modelStoreActions.clearModel();


    const lines = modelString.split('\n');
    // name1 -> name2
    const regulationRegex = /^\s*([a-zA-Z0-9_{}]+)\s*-([>|?])(\??)\s*([a-zA-Z0-9_{}]+)\s*$/;
    // #name:content
    const modelNameRegex = /^\s*#name:(.+)$/;
    // #description:content
    const modelDescriptionRegex = /^\s*#description:(.+)$/;
    // #position:var_name:num1,num2
    const positionRegex = /^\s*#position:([a-zA-Z0-9_{}]+):(.+?),(.+?)\s*$/;
    // $var_name:function_data
    const updateFunctionRegex = /^\s*\$\s*([a-zA-Z0-9_{}]+)\s*:\s*(.+)\s*$/;
    // #...
    const commentRegex = /^\s*#.*?$/;

    let modelName = '';
    let modelDescription = '';
    const regulations = [];
    const updateFunctions: { [key: string]: string } = {};

    // First, parse all lines into intermediate objects:
    for (let line of lines) {
        line = line.trim();
        if (line.length == 0) continue; // skip whitespace

        let match = line.match(modelNameRegex);

        if (match !== null) {
            modelName = match[1];
            continue;
        }

        match = line.match(modelDescriptionRegex);
        if (match !== null) {
            modelDescription = match[1];
            continue;
        }

        match = line.match(regulationRegex);
        if (match !== null) {
            let monotonicity = EdgeMonotonicity.unspecified;
            if (match[2] == '>') monotonicity = EdgeMonotonicity.activation;
            if (match[2] == '|') monotonicity = EdgeMonotonicity.inhibition;
            regulations.push({
                regulatorName: match[1],
                targetName: match[4],
                monotonicity: monotonicity,
                observable: match[3].length == 0
            });
            continue;
        }

        match = line.match(updateFunctionRegex);
        if (match !== null) {
            updateFunctions[match[1]] = match[2];
            continue;
        }
        if (!line.match(commentRegex) && !line.match(positionRegex)) {
            throw new Error(`Unexpected line in file:  + ${line}`)
        }
    }

    modelStoreActions.setName(modelName);
    modelStoreActions.setDescription(modelDescription);

    const allVariableNames = new Set(regulations.flatMap(template => [template.regulatorName, template.targetName]));
    allVariableNames.forEach(name => {
        modelStoreActions.createVariable(name);
    });

    regulations.forEach(template => {
        const sourceId = modelStoreActions.getVariableId(template.regulatorName);
        const targetId = modelStoreActions.getVariableId(template.targetName);
        modelStoreActions.createRegulation(sourceId, targetId, template.monotonicity, template.observable);
    });


    Object.entries(updateFunctions).forEach(([name, updateFunction]) => {
        if (!allVariableNames.has(name)) {
            modelStoreActions.createVariable(name);
        }
        const variableId = modelStoreActions.getVariableId(name);
        modelStoreActions.setVariableUpdateFunction(variableId, updateFunction);
    });

}