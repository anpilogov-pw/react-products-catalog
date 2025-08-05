import { useTranslation } from "react-i18next";
import { SearchForm } from "@/components";

function MainPage() {
	const { t } = useTranslation();

	return (
		<div className='text-center'>
			<h1 className='text-4xl font-bold text-gray-800 mb-8'>
				{t("header.title")}
			</h1>
			<SearchForm />
		</div>
	);
}

export default MainPage;
