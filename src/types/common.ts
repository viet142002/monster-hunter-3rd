export type StringOrUndefinedOrNullType = string | undefined | null;
export type NumberOrUndefinedOrNullType = number | undefined | null;
export type BooleanOrUndefinedOrNullType = boolean | undefined | null;

export interface IPagination {
	total: number;
	limit: number;
	page: number;
}
