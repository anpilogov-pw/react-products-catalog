import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchForm } from "@/components";
import { Link } from "react-router-dom";
import { RouterNames } from "@/constants";
import { useState } from "react";

function MainLayout() {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const altLang = i18n.language === "en" ? "RU" : "EN";

	const toggleLanguage = () => {
		i18n.changeLanguage(altLang.toLocaleLowerCase());
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='sticky top-0 z-10 bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						<Link to={RouterNames.HOME} className='text-xl font-semibold text-gray-900 hover:text-blue-600'>
							{t("header.title")}
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center gap-8'>
							<nav className='flex gap-6'>
								<Link 
									to={RouterNames.PRODUCTS} 
									className={location.pathname.startsWith('/products') 
										? 'text-blue-600 font-medium' 
										: 'text-gray-700 hover:text-blue-600'
									}
								>
									{t("navigation.products")}
								</Link>
								<Link 
									to={RouterNames.FAVORITES} 
									className={location.pathname === '/favorites' 
										? 'text-blue-600 font-medium' 
										: 'text-gray-700 hover:text-blue-600'
									}
								>
									{t("navigation.favorites")}
								</Link>
							</nav>
							<div className='flex items-center gap-4'>
								<SearchForm />
								<button
									onClick={toggleLanguage}
									className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
								>
									{altLang}
								</button>
							</div>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMenu}
							className='md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600'
						>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
							</svg>
						</button>
					</div>

					{/* Mobile Menu */}
					{isMenuOpen && (
						<div className='md:hidden border-t bg-white'>
							<div className='px-4 py-4 space-y-4'>
								<nav className='flex flex-col space-y-3'>
									<Link 
										to={RouterNames.PRODUCTS} 
										className={location.pathname.startsWith('/products') 
											? 'text-blue-600 font-medium' 
											: 'text-gray-700 hover:text-blue-600'
										}
										onClick={() => setIsMenuOpen(false)}
									>
										{t("navigation.products")}
									</Link>
									<Link 
										to={RouterNames.FAVORITES} 
										className={location.pathname === '/favorites' 
											? 'text-blue-600 font-medium' 
											: 'text-gray-700 hover:text-blue-600'
										}
										onClick={() => setIsMenuOpen(false)}
									>
										{t("navigation.favorites")}
									</Link>
								</nav>
								<div className='flex flex-col space-y-3'>
									<SearchForm hideResetButton />
									<button
										onClick={toggleLanguage}
										className='self-start px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
									>
										{altLang}
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</header>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
