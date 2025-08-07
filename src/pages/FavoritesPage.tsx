import { ProductCard } from "@/components";
import { useFavorites } from "@/hooks";
import { useTranslation } from "react-i18next";
import type { TProduct } from "@/types/TProduct";

function FavoritesPage() {
	const { t } = useTranslation();
	const { favorites } = useFavorites();

	return (
		<>
			<h1 className='text-2xl font-bold text-gray-800 mb-6'>
				{t("navigation.favorites")} ({favorites.length})
			</h1>
			{favorites.length === 0 ? (
				<div className='text-center text-gray-500 mt-8'>
					<p className='text-lg'>{t("search.noResults")}</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{favorites.map((product: TProduct) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</>
	);
}

export default FavoritesPage
