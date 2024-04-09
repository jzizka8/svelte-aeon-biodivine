export const compareCardinality = (a: { cardinality: number }, b: { cardinality: number }) =>
	(b.cardinality ?? 0) - (a.cardinality ?? 0);

