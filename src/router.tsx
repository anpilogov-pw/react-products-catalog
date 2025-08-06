import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
	FavoritesPage,
	MainPage,
	NotFoundPage,
	ProductPage,
	ProductsPage,
} from "@/pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: "products",
				element: <ProductsPage />,
			},
			{
				path: "products/:id",
				element: <ProductPage />,
			},
			{
				path: "favorites",
				element: <FavoritesPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
