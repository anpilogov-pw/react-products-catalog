import type { TProduct } from "@/types/TProduct";
import { LazyImage } from "./LazyImage";
import { Link } from "react-router-dom";
import { RouterNames } from "@/constants";
import { useFavorites } from "@/hooks";
import { useTranslation } from "react-i18next";

type Props = {
	product: TProduct;
};

export function ProductCard({ product }: Props) {
	const { t } = useTranslation();
	const { isFavorite, addFavorite } = useFavorites();

	return (
		<div className='border rounded-lg p-4 shadow-sm'>
			<LazyImage
				src={product.thumbnail}
				alt={product.title}
				className='w-full h-48 object-contain rounded mb-3'
			/>
			<Link
				to={RouterNames.PRODUCT(product.id.toString())}
				className='font-semibold text-lg mb-2 hover:text-blue-600 block'
			>
				{product.title}
			</Link>
			<p className='text-gray-600 text-sm mb-3 line-clamp-2'>
				{product.description}
			</p>
			<div className='flex justify-between items-center mb-3'>
				<span className='text-xl font-bold text-green-600'>
					${product.price}
				</span>
				<span className='text-sm text-gray-500'>★ {product.rating}</span>
			</div>
			<button
				onClick={() => addFavorite(product)}
				className={`w-full py-2 px-4 rounded-lg border transition-colors ${
					isFavorite(product.id) 
						? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" 
						: "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
				}`}
			>
				{isFavorite(product.id) ? t("favorites.inFavorites") : t("favorites.addToFavorites")}
			</button>
		</div>
	);
}
