import { EdgeMonotonicity, type Position } from '$lib/types/types';
import { modelStoreActions } from '$lib/stores/modelStore';
import { Conversions } from 'aeon-wasm';

type parsedData = {
	modelName: string;
	modelDescription: string;
	regulations: parsedRegulation[];
	updateFunctions: { [key: string]: string };
	positions: { [key: string]: Position };
};
type parsedRegulation = {
	regulatorName: string;
	targetName: string;
	monotonicity: EdgeMonotonicity;
	observable: boolean;
};

export function importSbml(sbmlString: string) {
	const aeonModel = Conversions.sbml_to_aeon(sbmlString);
	importAeon(aeonModel);
}
export function importAeon(modelString: string) {
	modelStoreActions.clearModel();

	const parsedData: parsedData = parseAeon(modelString);
	updateModelFromParsedData(parsedData);
}

function parseAeon(modelString: string) {
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
	const positions: { [key: string]: Position } = {};
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

		match = line.match(positionRegex);
		if (match !== null) {
			const x = parseFloat(match[2]);
			const y = parseFloat(match[3]);
			if (!isNaN(x) && !isNaN(y)) {
				positions[match[1]] = { x, y };
			}
			continue;
		}

		match = line.match(updateFunctionRegex);
		if (match !== null) {
			updateFunctions[match[1]] = match[2];
			continue;
		}
		if (!line.match(commentRegex) && !line.match(positionRegex)) {
			throw new Error(`Unexpected line in file:  + ${line}`);
		}
	}
	return { modelName, modelDescription, regulations, updateFunctions, positions };
}

function updateModelFromParsedData(parsedData: parsedData) {
	const { modelName, modelDescription, regulations, updateFunctions, positions } = parsedData;

	modelStoreActions.clearModel();
	modelStoreActions.setName(modelName);
	modelStoreActions.setDescription(modelDescription);

	// Logic to create variables and regulations from the parsed data
	const allVariableNames = new Set(
		regulations.flatMap((reg) => [reg.regulatorName, reg.targetName])
	);
	allVariableNames.forEach((name) =>
		modelStoreActions.createVariable(name, positions[name] || null)
	);

	regulations.forEach((reg) => {
		const sourceId = modelStoreActions.getVariableId(reg.regulatorName);
		const targetId = modelStoreActions.getVariableId(reg.targetName);
		modelStoreActions.createRegulation(sourceId, targetId, reg.monotonicity, reg.observable);
	});

	Object.entries(updateFunctions).forEach(([name, func]) => {
		const variableId = modelStoreActions.getVariableId(name);
		modelStoreActions.setVariableUpdateFunction(variableId, func);
	});
}
