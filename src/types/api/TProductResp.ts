import type { TProduct } from "../TProduct";

export type TProductResp = {
	products: TProduct[];
	total: number;
	skip: number;
	limit: number;
};
