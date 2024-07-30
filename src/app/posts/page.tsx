'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

const getData = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');

	return response.json();
};

const PostsPage = () => {
	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ['posts'],
		queryFn: getData,
	});
	console.log(isLoading, isSuccess, error);
	return (
		<>
			<div>
				<h1 className="text-xl font-bold mx-auto text-center mb-2">
					Get Posts Without Anything
				</h1>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<Loader size={20} className="animate-spin mr-2" />
						Loading...
					</div>
				) : (
					data?.map((post: any, i: number) => <div key={i}>{post.title}</div>)
				)}
			</div>
		</>
	);
};

export default PostsPage;
