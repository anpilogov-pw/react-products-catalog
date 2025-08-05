import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RouterNames } from "@/constants";

type Props = {
	searchText?: string;
};

function SearchForm({ searchText }: Props) {
	const [searchQuery, setSearchQuery] = useState<string>(searchText || "");
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleSearch = () => {
		const trimmed = searchQuery.trim();
		if (!trimmed) return;
		navigate(RouterNames.USERS_SEARCH(encodeURIComponent(trimmed)));
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleKeyUp = (event: React.KeyboardEvent) => {
		if (event.key !== "Enter") return;
		handleSearch();
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-sm border max-w-md mx-auto'>
			<div className='flex gap-2'>
				<input
					type='text'
					value={searchQuery}
					onChange={handleInputChange}
					onKeyUp={handleKeyUp}
					placeholder={t("search.placeholder")}
					className='flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					onClick={handleSearch}
					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
				>
					{t("search.button")}
				</button>
			</div>
		</div>
	);
}

export default SearchForm;
