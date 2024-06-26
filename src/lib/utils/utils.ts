import { EdgeMonotonicity, type Regulation } from '$lib/types/types';

export function generateRegulationId(sourceId: string, targetId: string) {
	return `${sourceId}_${targetId}`;
}

export function regulationShortcut(regulation: Regulation) {
	let arrow;
	if (regulation.monotonicity === EdgeMonotonicity.activation) {
		arrow = '->';
	} else if (regulation.monotonicity === EdgeMonotonicity.inhibition) {
		arrow = '-|';
	} else {
		arrow = '-?';
	}

	if (regulation.observable) {
		return arrow;
	}
	return `${arrow}?`;
}

export function nextMonotonicity(monotonicity: EdgeMonotonicity) {
	switch (monotonicity) {
		case EdgeMonotonicity.activation:
			return EdgeMonotonicity.inhibition;
		case EdgeMonotonicity.inhibition:
			return EdgeMonotonicity.unspecified;
		default:
			return EdgeMonotonicity.activation;
	}
}

// Takes array of str in string '["Stability", "Disorder"]' and returns first letter of each str
export function normalizeClass(cls: string[] | string) {
	if (typeof cls === 'string') {
		cls = JSON.parse(cls) as string[];
	}
	return cls
		.map((x) => x[0])
		.sort()
		.join('');
}