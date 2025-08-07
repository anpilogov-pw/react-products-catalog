export const RouterNames = {
	HOME: "/",
	FAVORITES: "/favorites",
	PRODUCTS: `/products`,
	PRODUCTS_SEARCH: (search: string) => `/products/?search=${search}`,
	PRODUCT: (id: string) => `/products/${id}`,
};
