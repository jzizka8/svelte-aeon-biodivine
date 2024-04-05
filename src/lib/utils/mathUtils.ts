export function calcDimPercent(cardinality: number, total: number) {
	return Math.round(((Math.log2(cardinality) + 1) / (Math.log2(total) + 1)) * 100);
}

export function calcPercent(cardinality: number, total: number) {
	return Math.round((cardinality / total) * 100);
}
