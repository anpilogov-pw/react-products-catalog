export const RouterNames = {
	HOME: "/",
	FAVORITES: "/favorites",
	USERS_SEARCH: (search: string) => `/users/?search=${search}`,
	USER: (id: string) => `/user/${id}`,
};
