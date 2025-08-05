import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MainLayout() {
	const { t, i18n } = useTranslation();

	const altLang = i18n.language === "en" ? "RU" : "EN";

	const toggleLanguage = () => {
		i18n.changeLanguage(altLang.toLocaleLowerCase());
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						<h1 className='text-xl font-semibold text-gray-900'>
							{t("header.title")}
						</h1>
						<button
							onClick={toggleLanguage}
							className='px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
						>
							{altLang}
						</button>
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
