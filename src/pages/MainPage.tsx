import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProductCard, LoadingSpinner } from "@/components";
import { useHomeProducts } from "@/hooks";
import type { TProduct } from "@/types/TProduct";

function MainPage() {
	const { t } = useTranslation();
	const { products, isLoading } = useHomeProducts();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='text-center'>
			<h1 className='text-4xl font-bold text-gray-800 mb-8'>
				{t("header.title")}
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
				{products.map((product: TProduct) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<Link
				to='/products'
				className='inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg'
			>
				{t("navigation.products")}
			</Link>
		</div>
	);
}

export default MainPage;
