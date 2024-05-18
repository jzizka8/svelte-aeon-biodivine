import type { CardinalityClass } from './treeExplorerTypes';

export type computationResult = {
	is_finished: boolean;
	data: CardinalityClass[];
	elapsed: number;
	progress: string;
	error?: string;
};
