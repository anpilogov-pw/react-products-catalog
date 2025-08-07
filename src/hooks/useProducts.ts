import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks";
import { CONFIG, PRODUCTS_API } from "@/constants";
import type { TProductResp } from "@/types/api/TProductResp";

export function useProducts() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchText = useMemo(
		() => searchParams.get("search") || "",
		[searchParams]
	);

	const currentPage = useMemo(
		() => Number(searchParams.get("page")) || 1,
		[searchParams]
	);
	const limit = CONFIG.productsLimin;

	const skip = (currentPage - 1) * limit;
	const searchUrl = searchText
		? `${PRODUCTS_API}/search?q=${searchText}&limit=${limit}&skip=${skip}`
		: `${PRODUCTS_API}?limit=${limit}&skip=${skip}`;

	const {
		data: productsResp,
		isLoading,
		execute,
	} = useFetch<TProductResp>(searchUrl, {}, { immediate: false });

	useEffect(() => {
		if (
			searchParams.get("page") &&
			searchText !== (searchParams.get("search") || "")
		) {
			const newParams = new URLSearchParams(searchParams);
			newParams.delete("page");
			setSearchParams(newParams);
		}
	}, [searchText, searchParams, setSearchParams]);

	useEffect(() => {
		execute();
	}, [searchUrl]);

	const totalProducts = Number(productsResp?.total ?? 0);
	const totalPages = productsResp ? Math.ceil(productsResp.total / limit) : 0;

	const handlePageChange = (page: number) => {
		const newParams = new URLSearchParams(searchParams);
		if (page === 1) {
			newParams.delete("page");
		} else {
			newParams.set("page", page.toString());
		}
		setSearchParams(newParams);
	};

	return {
		searchText,
		products: productsResp?.products || [],
		isLoading,
		totalProducts,
		currentPage,
		totalPages,
		handlePageChange,
	};
}
