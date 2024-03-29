import type { Regulation } from '$lib/types/types';

type DegreeMap = Record<
	string,
	{
		in: number;
		out: number;
	}
>;
function calculateMaxDegrees(regulations: Regulation[]): [number, number] {
	const degreeMap = regulations.reduce((acc: DegreeMap, { source, target }) => {
		// Initialize or update out-degree for source
		acc[source.id] = acc[source.id] ?? { in: 0, out: 0 };
		acc[source.id].out += 1;

		// Initialize or update in-degree for target
		acc[target.id] = acc[target.id] ?? { in: 0, out: 0 };
		acc[target.id].in += 1;

		return acc;
	}, {});

	let maxInDegree = 0,
		maxOutDegree = 0;
	Object.values(degreeMap).forEach(({ in: inDegree, out: outDegree }) => {
		maxOutDegree = Math.max(maxOutDegree, outDegree);
		maxInDegree = Math.max(maxInDegree, inDegree);
	});

	return [maxInDegree, maxOutDegree];
}

export { calculateMaxDegrees };
