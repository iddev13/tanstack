'use client';

import { usePosts } from '@/hooks/use-posts';
import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';

const PostsAxiosHooksPage = () => {
	const { data, isLoading } = usePosts();
	const queryClient = useQueryClient(); // refetch
	return (
		<div>
			<h1 className="text-xl font-bold mx-auto text-center mb-2">
				Get Posts With Hook & Axios
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

export default PostsAxiosHooksPage;
