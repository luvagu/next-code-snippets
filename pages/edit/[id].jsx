import Head from 'next/head'
import SnippetForm from '../../componets/SnippetForm'
import { getSnippetById } from '../../utils/fauna.helpers'

export default function EditSnippet({ snippet }) {
	return (
		<div>
			<Head>
				<title>Edit Snippet</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="max-w-lg mx-auto">
				<h1 className="text-red-100 text-2xl mb-4">Edit Snippet</h1>
				<SnippetForm snippet={snippet} />
			</main>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const id = context.params.id
		const snippet = await getSnippetById(id)
		return {
			props: { snippet },
		}
	} catch (error) {
		console.error(error)
		context.res.statusCode = 302
		context.res.setHeader('Location', `/`)
		return { props: {} }
	}
}
