import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import useSWR from 'swr'
import Header from '../componets/Header'
import Snippet from '../componets/Snippet'

export default function MySnippets() {
    const { data: snippets } = useSWR('/api/getUserSnippets')

    return (
        <>
            <Head>
				<title>My Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <main className="">
				<Header title='My Code Snippets' />

				{snippets &&
					snippets.map(snippet => (
						<Snippet
							key={snippet.id}
							snippet={snippet}
						/>
					))
                }
			</main>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired()

// Alternative way passing snippets as props and without api use useSWR('/api/getUserSnippets')
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