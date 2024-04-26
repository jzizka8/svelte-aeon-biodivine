export type computationResult = {
	is_partial: boolean;
	data: {
		sat_count: number;
		phenotype: string[];
	}[];
	elapsed: number;
};
