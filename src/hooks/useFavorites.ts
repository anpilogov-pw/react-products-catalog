import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '@/store';
import { loadFavorites, toggleFavorite } from '@/store/favoritesSlice';
import type { TProduct } from '@/types/TProduct';

export function useFavorites() {
	const dispatch = useDispatch();
	const favorites = useSelector((state: RootState) => state.favorites.items);

	useEffect(() => {
		dispatch(loadFavorites());
	}, [dispatch]);

	const isFavorite = (id: number) => {
		return favorites.some((product) => product.id === id);
	};

	const addFavorite = (product: TProduct) => {
		dispatch(toggleFavorite(product));
	};

	return { favorites, isFavorite, addFavorite };
}
