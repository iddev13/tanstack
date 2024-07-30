'use client';

import { Loader } from 'lucide-react';
import { usePostById } from '@/hooks/use-post-by-id';

const OnePostPage = () => {
	const { data, isLoading } = usePostById(1);

	return (
		<div>
			<h1 className="text-xl font-bold mx-auto text-center mb-2">
				Get One Post With Axios & Hook
			</h1>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<Loader size={20} className="animate-spin mr-2" />
					Loading...
				</div>
			) : (
				<div>{data?.title}</div>
			)}
		</div>
	);
};

export default OnePostPage;
