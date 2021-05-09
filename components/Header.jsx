import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export default function Header({ title, subTitle }) {
	const { isLoading, user } = useUser()
	return (
		<header className="my-12">
			<h1 className="text-white text-2xl">{title}</h1>

			{subTitle && <p className="text-gray-200">{subTitle}</p>}

			{!isLoading && user && (
				<Link href="/new">
					<a className="mt-3 inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Create New Snippet
					</a>
				</Link>
			)}

			{!isLoading && !user && (
				<Link href="/api/auth/login">
					<a className="mt-3 inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Log In to Create Snippets
					</a>
				</Link>
			)}
		</header>
	)
}
