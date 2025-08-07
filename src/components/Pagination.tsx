type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex justify-center items-center gap-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
			>
				←
			</button>

			{getVisiblePages().map((page, index) => (
				<button
					key={index}
					onClick={() => typeof page === 'number' && onPageChange(page)}
					disabled={page === '...'}
					className={`px-3 py-2 border rounded cursor-pointer ${
						page === currentPage
							? 'bg-blue-600 text-white'
							: page === '...'
							? 'cursor-default'
							: 'hover:bg-gray-100'
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
			>
				→
			</button>
		</div>
	);
}