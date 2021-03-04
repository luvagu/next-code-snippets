import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import Head from "next/head"
import useSWR from "swr"
import Header from "../componets/Header"
import Snippet from "../componets/Snippet"

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