import Head from 'next/head'
import useSWR from 'swr'
import Header from '../componets/Header'
import Snippet from '../componets/Snippet'

export default function Home() {
	const { data: snippets, mutate } = useSWR('/api/getSnippets')

	return (
		<>
			<Head>
				<title>EveryDay Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header
					title="Handy Code Snippets"
					subTitle="Create and browse snippets you use every day in Web Development!"
				/>

				{snippets &&
					snippets.map((snippet) => (
						<Snippet
							key={snippet.id}
							snippet={snippet}
							snippetDeleted={mutate}
						/>
					))}
			</main>
		</>
	)
}
