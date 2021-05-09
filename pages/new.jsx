import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import SnippetForm from '../components/SnippetForm'

export default function New() {
	return (
		<>
			<Head>
				<title>Create New Snippet</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="max-w-lg mx-auto">
				<h1 className="text-white text-2xl mb-4">Create New Snippet</h1>
				<SnippetForm />
			</main>
		</>
	)
}

export const getServerSideProps = withPageAuthRequired()
