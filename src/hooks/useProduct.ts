import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks";
import { PRODUCTS_API } from "@/constants";
import type { TProduct } from "@/types/TProduct";

export function useProduct() {
	const { id } = useParams<{ id: string }>();
	
	const {
		data: product,
		isLoading,
		error,
	} = useFetch<TProduct>(`${PRODUCTS_API}/${id}`);

	return {
		product,
		isLoading,
		error,
	};
}