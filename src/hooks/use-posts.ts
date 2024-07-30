import { IPost } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const getData = async () => {
	const response = await axios.get<IPost[]>(
		'https://jsonplaceholder.typicode.com/posts'
	);
	return response;
};

const initialData: { data: IPost[] } = {
	data: [
		{
			body: 'Initial body',
			id: 0,
			title: 'Initial Title',
			userId: 0,
		},
	],
};

export function usePosts(isEnabled?: boolean) {
	const { data, isLoading, isSuccess, isError, refetch } = useQuery({
		queryKey: ['posts'],
		queryFn: getData,
		select: (data) => data.data,
		enabled: isEnabled, // isAuth?
		// initialData
		// staleTime:1000 // Revalidate data ms
	});

	refetch();

	useEffect(() => {
		if (isSuccess) console.log('Data fetched successfully');
	}, []);
	useEffect(() => {
		if (isError) console.log('Error fething data');
	}, []);
	return { data, isLoading, isSuccess, isError };
}
