import { SearchForm } from '@/components'
import { useFetch } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

type User = {
	id: number;
	name: string;
	email: string;
};

function UsersPage() {
	const [searchParams] = useSearchParams();
	const searchText = searchParams.get('search') || '';

	const { data, isLoading } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {}, { immediate: false });

	return (
		<>
			<SearchForm searchText={searchText}/>
			{ isLoading }
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data?.map(user => (
					<div key={user.id}>{user.name}</div>
				))}
			</div>
		</>
	)
}

export default UsersPage