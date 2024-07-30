'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ id: 1, href: '/posts', label: 'posts' },
	{ id: 2, href: '/axios', label: 'posts-axios' },
	{ id: 3, href: '/hooks', label: 'posts-axios-hooks' },
	{ id: 4, href: '/onePost', label: 'one-post-page' },
	{ id: 5, href: '/mutation', label: 'posts-mutation' },
];

export const Header = () => {
	const pathname = usePathname();

	return (
		<div className="flex items-center py-4 border-b max-w-5xl mx-auto w-full px-12">
			<div className="flex-1">
				<Link href="/">LOGO</Link>
			</div>
			<nav>
				<ul className="flex gap-x-4">
					{links.map((elem) => (
						<li key={elem.id}>
							<Link
								href={elem.href}
								className={`capitalize hover:underline ${
									pathname === elem.href ? 'underline' : ''
								}`}
							>
								{elem.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
