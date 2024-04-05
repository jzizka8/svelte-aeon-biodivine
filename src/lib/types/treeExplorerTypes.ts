export type Stability = {
	variable: string;
	data: {
		vector: string[];
		colors: number;
	}[];
};
// export type CardinalityClass = {
// 	cardinality: number;
// 	class: string;
// 	fraction: number;
// };

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

export type CardinalityClass = {
	cardinality: number;
	class: string;
};

export type TreeNode = {
	id: number;
	label: string;
	treeData: TreeData;
	subtype?: string;
};
export type TreeData = {
	type: NodeType;
	cardinality: number;
	attribute_id?: number;
	attribute_name?: string;
	classes?: CardinalityClass[];
	left?: number;
	right?: number;
	all_classes?: CardinalityClass[];
};

export type Condition = {
	attribute: string;
	isPositive: boolean;
};
export type LeafData = TreeNode & {
	conditions: Condition[];
	totalCardinality: number;
};