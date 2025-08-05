import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
	FavoritesPage,
	MainPage,
	NotFoundPage,
	UserPage,
	UsersPage,
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
				path: "users",
				element: <UsersPage />,
			},
			{
				path: "users/:id",
				element: <UserPage />,
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
