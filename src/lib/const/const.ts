import {
	compareInformationGain,
	compareTotalClasses,
	comparePositive,
	comparePositiveMajority,
	compareNegative,
	compareNegativeMajority,
	compareAttrName
} from '../utils/comparators';

export const EXPECTED_ENGINE_VERSION = 'v0.4.1';
export const DEFAULT_ENGINE_ADDRESS = 'http://localhost:8000';

export const DOUBLE_CLICK_DELAY = 400;

// for the tree explorer
export const SORT_INFORMATION_GAIN = 'sort-information-gain';
export const SORT_TOTAL_CLASSES = 'sort-total-classes';
export const SORT_POSITIVE = 'sort-positive';
export const SORT_POSITIVE_MAJORITY = 'sort-positive-majority';
export const SORT_NEGATIVE = 'sort-negative';
export const SORT_NEGATIVE_MAJORITY = 'sort-negative-majority';
export const SORT_ALPHABETICAL = 'sort-alphabetical';

export const sortOptions = [
	{ id: SORT_INFORMATION_GAIN, label: 'Information gain', comparator: compareInformationGain },
	{ id: SORT_TOTAL_CLASSES, label: 'Total classes', comparator: compareTotalClasses },
	{ id: SORT_POSITIVE, label: 'Positive', comparator: comparePositive },
	{ id: SORT_POSITIVE_MAJORITY, label: 'Positive majority', comparator: comparePositiveMajority },
	{ id: SORT_NEGATIVE, label: 'Negative', comparator: compareNegative },
	{ id: SORT_NEGATIVE_MAJORITY, label: 'Negative majority', comparator: compareNegativeMajority },
	{ id: SORT_ALPHABETICAL, label: 'Alphabetical', comparator: compareAttrName }
];
