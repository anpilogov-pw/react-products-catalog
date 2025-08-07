import { useProduct, useFavorites } from "@/hooks";
import { LoadingSpinner, LazyImage } from "@/components";
import { useTranslation } from "react-i18next";

function ProductPage() {
	const { t } = useTranslation();
	const { product, isLoading, error } = useProduct();
	const { isFavorite, addFavorite } = useFavorites();

	if (isLoading) return <LoadingSpinner />;
	if (error || !product) return <div className="text-center text-red-500">{t("common.error")}</div>;

	return (
		<div className="max-w-4xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<LazyImage
						src={product.thumbnail}
						alt={product.title}
						className="w-full h-96 object-cover rounded-lg"
					/>
				</div>
				<div>
					<h1 className="text-3xl font-bold mb-4">{product.title}</h1>
					<p className="text-gray-600 mb-6">{product.description}</p>
					<div className="flex items-center gap-4 mb-6">
						<span className="text-3xl font-bold text-green-600">${product.price}</span>
						<span className="text-lg text-gray-500">★ {product.rating}</span>
					</div>
					<div className="space-y-2 mb-6">
						<p><span className="font-semibold">{t("product.brand")}</span> {product.brand}</p>
						<p><span className="font-semibold">{t("product.category")}</span> {product.category}</p>
						<p><span className="font-semibold">{t("product.stock")}</span> {product.stock}</p>
					</div>
					<button
						onClick={() => addFavorite(product)}
						className={`w-full py-3 px-6 rounded-lg border transition-colors text-lg ${
							isFavorite(product.id) 
								? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" 
								: "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
						}`}
					>
						{isFavorite(product.id) ? t("favorites.inFavorites") : t("favorites.addToFavorites")}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductPage
