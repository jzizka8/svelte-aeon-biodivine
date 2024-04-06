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
	// currently: '["Stability", "Disorder"]', TODO: make this a list of enums
	class: string;
};

export type TreeNode = {
	id: number;
	label: string;
	treeData: TreeData;
	subtype?: string;
};
// TODO: make it use camelCase
export type TreeData = {
	id: number;
	type: NodeType;
	cardinality: number;
	attribute_id?: number;
	attribute_name?: string;
	// TODO: unify these two
	classes?: CardinalityClass[];
	all_classes?: CardinalityClass[];
	left?: number;
	right?: number;
};

export type Condition = {
	attribute: string;
	isPositive: boolean;
};
export type LeafData = TreeData & {
	conditions: Condition[];
	totalCardinality: number;
	behavior: Behavior;
};
