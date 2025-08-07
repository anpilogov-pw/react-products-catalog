import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TProduct } from '@/types/TProduct';

type FavoritesState = {
	items: TProduct[];
}

const initialState: FavoritesState = {
	items: [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		loadFavorites: (state) => {
			const stored = localStorage.getItem('favorites');
			if (stored) {
				state.items = JSON.parse(stored);
			}
		},
		toggleFavorite: (state, action: PayloadAction<TProduct>) => {
			const product = action.payload;
			const exists = state.items.some(p => p.id === product.id);
			
			if (exists) {
				state.items = state.items.filter(p => p.id !== product.id);
			} else {
				state.items.push(product);
			}
			
			localStorage.setItem('favorites', JSON.stringify(state.items));
		},
	},
});

export const { loadFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;