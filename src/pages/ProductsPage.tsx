import {
	SearchForm,
	ProductCard,
	LoadingSpinner,
	Pagination,
} from "@/components";
import { PRODUCTS_API } from "@/constants";
import { useFetch } from "@/hooks";
import type { TProductResp } from "@/types/api/TProductResp";
import type { TProduct } from "@/types/TProduct";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ProductsPage() {
	const [searchParams] = useSearchParams();
	const searchText = useMemo(
		() => searchParams.get("search") || "",
		[searchParams]
	);

	const [currentPage, setCurrentPage] = useState(1);
	const limit = 12;

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
		setCurrentPage(1);
	}, [searchText]);

	useEffect(() => {
		execute();
	}, [searchUrl]);

	const totalPages = productsResp ? Math.ceil(productsResp.total / limit) : 0;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<>
			<div className='flex gap-4 items-center'>
				<SearchForm searchText={searchText} />
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{productsResp?.products?.map((product: TProduct) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</>
	);
}

export default ProductsPage;
