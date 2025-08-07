import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchForm } from "@/components";
import { Link } from "react-router-dom";
import { RouterNames } from "@/constants";

function MainLayout() {
	const { t, i18n } = useTranslation();

	const altLang = i18n.language === "en" ? "RU" : "EN";

	const toggleLanguage = () => {
		i18n.changeLanguage(altLang.toLocaleLowerCase());
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='sticky top-0 z-10 bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>

						<div className='flex items-center gap-8'>
							<Link to={RouterNames.HOME} className='text-xl font-semibold text-gray-900 hover:text-blue-600'>
								{t("header.title")}
							</Link>
							<nav className='flex gap-6'>
								<Link to={RouterNames.PRODUCTS} className='text-gray-700 hover:text-blue-600'>
									{t("navigation.products")}
								</Link>
								<Link to={RouterNames.FAVORITES} className='text-gray-700 hover:text-blue-600'>
									{t("navigation.favorites")}
								</Link>
							</nav>
						</div>
						<div className='flex items-center gap-4'>
							<SearchForm />
							<button
								onClick={toggleLanguage}
								className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
							>
								{altLang}
							</button>
						</div>
					</div>
				</div>
			</header>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
