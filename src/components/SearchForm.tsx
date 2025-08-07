import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RouterNames } from "@/constants";

function SearchForm() {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleSearch = () => {
		const trimmed = searchQuery.trim();
		if (!trimmed) return;
		navigate(RouterNames.PRODUCTS_SEARCH(encodeURIComponent(trimmed)));
		setSearchQuery('');
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleKeyUp = (event: React.KeyboardEvent) => {
		if (event.key !== "Enter") return;
		handleSearch();
	};

	const resetSearch = () => {
		setSearchQuery('');
		navigate(RouterNames.PRODUCTS);
	};

	return (
		<div className='flex gap-2'>
			<input
				type='text'
				value={searchQuery}
				onChange={handleInputChange}
				onKeyUp={handleKeyUp}
				placeholder={t("search.placeholder")}
				className='px-3 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
			/>
			<button
				onClick={handleSearch}
				className='bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600'
			>
				{t("search.button")}
			</button>
			{searchQuery && (
				<button
					onClick={resetSearch}
					className='px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600'
				>
					{t("search.reset")}
				</button>
			)}
		</div>
	);
}

export default SearchForm;
