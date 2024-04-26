import type { Model, Position, Regulation, Variable } from '$lib/types/types';
import { regulationShortcut } from '$lib/utils/utils';
import { Conversions } from 'aeon-wasm';

type variablePosition = { variable: string; position: Position };

function formatUpdateFunction(variable: { name: string; updateFunction: string }) {
	return variable.updateFunction ? `$${variable.name}:${variable.updateFunction}` : '';
}

function formatRegulation(regulation: Regulation) {
	return `${regulation.source.name} ${regulationShortcut(regulation)} ${regulation.target.name}`;
}

export function exportAeon(model: Model, positions: variablePosition[] = []) {
	const name = `#name:${model.name}`;
	const description = `#description:${model.description}`;

	const regulations = model.regulations.map(formatRegulation);

	const updateFunctions = model.variables.map(formatUpdateFunction).filter((el) => el);

	const positionsFormatted = positions.map(
		(el) => `#position:${el.variable}:${el.position.x},${el.position.y}`
	);

	return [name, description, ...regulations, ...updateFunctions, ...positionsFormatted].join('\n');
}

export function exportAeonFragment(regulations: Regulation[], variable: Variable) {
	if (regulations.length === 0 && !variable.updateFunction) {
		return '';
	}

	const affectingRegulations = regulations.filter(
		(regulation) => regulation.target.name === variable.name
	);

	const formattedRegulations = affectingRegulations.map(formatRegulation);

	// this is a hack to make sure other variables do not create extra parameters.
	const dummyFunctions = affectingRegulations
		.filter((regulation) => regulation.source.id !== variable.id)
		.map((regulation) => {
			const variable = { name: regulation.source.name, updateFunction: 'false' };
			return formatUpdateFunction(variable);
		});

	return [...formattedRegulations, ...dummyFunctions, formatUpdateFunction(variable)].join('\n');
}

export function exportSbml(model: Model, positions: variablePosition[] = []) {
	const aeonModel = exportAeon(model, positions);
	return Conversions.aeon_to_sbml(aeonModel);
}

export function exportSbmlInstantiated(model: Model, positions: variablePosition[] = []) {
	const aeonModel = exportAeon(model, positions);
	return Conversions.aeon_to_sbml_instantiated(aeonModel);
}
