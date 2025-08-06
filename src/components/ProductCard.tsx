import type { TProduct } from "@/types/TProduct";
import { LazyImage } from "./LazyImage";

type Props = {
	product: TProduct;
};

export function ProductCard({ product }: Props) {
	return (
		<div className="border rounded-lg p-4 shadow-sm">
			<LazyImage
				src={product.thumbnail}
				alt={product.title}
				className="w-full h-48 object-cover rounded mb-3"
			/>
			<h3 className="font-semibold text-lg mb-2">{product.title}</h3>
			<p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
			<div className="flex justify-between items-center">
				<span className="text-xl font-bold text-green-600">${product.price}</span>
				<span className="text-sm text-gray-500">★ {product.rating}</span>
			</div>
		</div>
	);
}