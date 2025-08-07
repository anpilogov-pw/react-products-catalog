import { useFetch } from "@/hooks";
import { PRODUCTS_API } from "@/constants";
import type { TProductResp } from "@/types/api/TProductResp";

export function useHomeProducts() {
	const {
		data: productsResp,
		isLoading,
		error,
	} = useFetch<TProductResp>(`${PRODUCTS_API}?limit=9`);

	return {
		products: productsResp?.products || [],
		isLoading,
		error,
	};
}