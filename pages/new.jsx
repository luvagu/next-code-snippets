import Head from 'next/head'
import SnippetForm from '../componets/SnippetForm'

export default function New() {
	return (
		<div>
			<Head>
				<title>Create New Snippet</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="max-w-lg mx-auto">
				<h1 className="text-red-100 text-2xl mb-4">Create New Snippet</h1>
				<SnippetForm />
			</main>
		</div>
	)
}
