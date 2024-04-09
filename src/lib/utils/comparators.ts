import type { DecisionAttribute } from '$lib/types/treeExplorerTypes';

export const compareCardinality = (a: { cardinality: number }, b: { cardinality: number }) =>
	b.cardinality - a.cardinality;

export const compareInformationGain = (a: DecisionAttribute, b: DecisionAttribute) =>
	b.gain - a.gain;

export const compareTotalClasses = (a: DecisionAttribute, b: DecisionAttribute) => {
	const diff = a.right.length + a.left.length - (b.right.length + b.left.length);
	return diff === 0 ? compareInformationGain(a, b) : diff;
};

export const comparePositiveMajority = (a: DecisionAttribute, b: DecisionAttribute) => {
	const aBiggestMajority = a.right[0].cardinality / a.rightTotal;
	const bBiggestMajority = b.right[0].cardinality / b.rightTotal;
	const diff = bBiggestMajority - aBiggestMajority;
	return diff === 0 ? compareInformationGain(a, b) : diff;
};

export const compareNegativeMajority = (a: DecisionAttribute, b: DecisionAttribute) => {
	const aMajority = a.left[0].cardinality / a.leftTotal;
	const bFraction = b.left[0].cardinality / b.leftTotal;
	const diff = bFraction - aMajority;
	return diff === 0 ? compareInformationGain(a, b) : diff;
};

export const compareAttrName = (a: DecisionAttribute, b: DecisionAttribute) =>
	(a.name ?? '').localeCompare(b.name ?? '');

export const comparePositive = (a: DecisionAttribute, b: DecisionAttribute) => {
	const diff = b.rightTotal - a.rightTotal;
	return diff === 0 ? compareInformationGain(a, b) : diff;
};

export const compareNegative = (a: DecisionAttribute, b: DecisionAttribute) => {
	const diff = b.leftTotal - a.leftTotal;
	return diff === 0 ? compareInformationGain(a, b) : diff;
};
