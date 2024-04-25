import type { Model, Position } from '$lib/types/types';
import { regulationShortcut } from '$lib/utils/utils';
import { Conversions } from 'aeon-wasm';

type variablePosition = { variable: string; position: Position };

export function exportAeon(model: Model, positions: variablePosition[] = []) {
	let aeonModel = `#name:${model.name}\n`;
	aeonModel += `#description:${model.description}\n\n`;

	const regulations = model.regulations
		.map(
			(regulation) =>
				`${regulation.source.name} ${regulationShortcut(regulation)} ${regulation.target.name}`
		)
		.join('\n');

	const updateFunctions = model.variables
		.map((variable) =>
			variable.updateFunction ? `$${variable.name}:${variable.updateFunction}` : null
		)
		.filter((l) => l !== null)
		.join('\n');

	const positionsFormatted = positions
		.map((el) => `#position:${el.variable}:${el.position.x},${el.position.y}`)
		.join('\n');

	aeonModel += `${regulations}\n${updateFunctions}\n${positionsFormatted}`;
	return aeonModel;
}

export function exportSbml(model: Model, positions: variablePosition[] = []) {
	const aeonModel = exportAeon(model, positions);
	return Conversions.aeon_to_sbml(aeonModel);
}

export function exportSbmlInstantiated(model: Model, positions: variablePosition[] = []) {
	const aeonModel = exportAeon(model, positions);
	return Conversions.aeon_to_sbml_instantiated(aeonModel);
}
