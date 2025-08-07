import { ProductCard, LoadingSpinner, Pagination } from "@/components";
import { useProducts } from "@/hooks";
import type { TProduct } from "@/types/TProduct";
import { useTranslation } from "react-i18next";

function ProductsPage() {
	const { t } = useTranslation();
	const {
		searchText,
		products,
		isLoading,
		totalProducts,
		currentPage,
		totalPages,
		handlePageChange,
	} = useProducts();

	const title = searchText
		? `${t("search.resultsFor")} "${searchText}" (${totalProducts})`
		: `${t("products.title")} (${totalProducts})`;

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (totalProducts === 0) {
		return (
			<div className='text-center text-gray-500 mt-8'>
				<p className='text-lg'>{t("search.noResults")}</p>
			</div>
		);
	}

	return (
		<>
			<h1 className='text-2xl font-bold text-gray-800 mb-6'>{title}</h1>
			<div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{products.map((product: TProduct) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</>
	);
}

export default ProductsPage;
