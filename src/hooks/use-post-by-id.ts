import { IPost } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const getData = async (id: number) => {
	const response = await axios.get<IPost>(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	);
	return response;
};

export function usePostById(id: number) {
	const { data, isLoading, isSuccess, isError, refetch } = useQuery({
		queryKey: ['post', id],
		queryFn: () => getData(id),
		select: (data) => data.data,
		enabled: !!id,
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
