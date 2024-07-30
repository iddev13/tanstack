'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import axios from 'axios';

import { IPost } from '@/types/post';
import { Button } from '@/components/ui/button';

const isAuth = false;

const getData = async () => {
	const response = await axios.get<IPost[]>(
		'https://jsonplaceholder.typicode.com/posts'
	);
	return response;
};

const PostsAxiosPage = () => {
	const queryClient = useQueryClient(); // refetch

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['posts'],
		queryFn: getData,
		select: (data) => data.data,
		enabled: isAuth,
	});

	useEffect(() => {
		if (isSuccess) console.log('Data fetched successfully');
	}, []);
	useEffect(() => {
		if (isError) console.log('Error fething data');
	}, []);

	return (
		<div>
			<h1 className="text-xl font-bold mx-auto text-center mb-2">
				Get Posts With Axios
			</h1>
			<Button
				className="block mx-auto"
				onClick={() => {
					queryClient.invalidateQueries({ queryKey: ['posts'] });
				}}
			>
				Invalidate posts "refetch"
			</Button>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<Loader size={20} className="animate-spin mr-2" />
					Loading...
				</div>
			) : (
				data?.map((post) => <div key={post.id}>{post.title}</div>)
			)}
		</div>
	);
};

export default PostsAxiosPage;
