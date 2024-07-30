'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { IPost } from '@/types/post';
import { Button } from '@/components/ui/button';

const MutationPage = () => {
  const queryClient = useQueryClient(); // refetch
	const { mutate, isPending } = useMutation({
		mutationKey: ['add post'],
		mutationFn: (newPost: Omit<IPost, 'id'>) => {
			return axios.post(`https://jsonplaceholder.typicode.com/posts`, newPost);
		},
		onError: () => {
			console.log('Error');
		},
		onSuccess: () => {
			console.log('Success');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	return (
		<div>
			<h1 className="text-xl font-bold mx-auto text-center mb-2">
				Mutation Page
			</h1>
			<Button
				className="block mx-auto"
				onClick={() => {
					mutate({
						body: 'New body',
						title: 'New title',
						userId: 1,
					});
				}}
				disabled={isPending}
			>
				{isPending ? 'Loading...' : 'Create'}
			</Button>
		</div>
	);
};

export default MutationPage;
