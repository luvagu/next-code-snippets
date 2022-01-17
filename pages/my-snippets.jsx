import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import useSWR from 'swr'
import Header from '../components/Header'
import Snippet from '../components/Snippet'

export default function MySnippets() {
	const { data: snippets } = useSWR('/api/getUserSnippets')

	return (
		<>
			<Head>
				<title>My Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title="My Code Snippets" />

				{snippets &&
					snippets.map((snippet) => (
						<Snippet key={snippet.id} snippet={snippet} />
					))}
			</main>
		</>
	)
}

export const getServerSideProps = withPageAuthRequired()

// An alternative way of passing 'snippets' as props and without api usage is: useSWR('/api/getUserSnippets')
// export const getServerSideProps = withPageAuthRequired({
// 	async getServerSideProps(context) {
// 		try {
// 			const session = getSession(context.req, context.res)
// 			const userId = session.user.sub
// 			const snippets = await getSnippetByUserId(userId)
// 			return {
// 				props: { snippets }
// 			}
// 		} catch (error) {
// 			console.error(error)
// 			context.res.statusCode = 302
// 			context.res.setHeader('Location', `/`)
// 			return { props: {} }
// 		}
// 	}
// })
