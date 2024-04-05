export type Stability = {
	variable: string;
	data: {
		vector: string[];
		colors: number;
	}[];
};
export type CardinalityClass = {
	cardinality: number;
	class: string;
	fraction: number;
};

export type DecisionAttribute = {
	id: number;
	name: string;
	left: CardinalityClass[];
	right: CardinalityClass[];
	gain: number;
	leftTotal: number;
	rightTotal: number;
};
export enum NodeType {
	Unprocessed = 'unprocessed',
	Decision = 'decision',
	Leaf = 'leaf'
}

export type Class = {
	cardinality: number;
	class: string;
};

export type TreeNode = {
	type: NodeType;
	cardinality: number;
	classes: Class[];
	id: number;
	attribute_id?: number;
	left?: number;
	right?: number;
	attribute_name?: string;
	all_classes?: Class[];
};

export type Condition = {
	attribute: string;
	isPositive: boolean;
};
export type LeafData = {
	conditions: Condition[];
	phenotype: string;
	cardinality: number;
	totalCardinality: number;
};