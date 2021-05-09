import Head from 'next/head'
import Header from '../../components/Header'
import Snippet from '../../components/Snippet'
import { getSnippetByLanguage } from '../../utils/fauna.helpers'
import { getFormatedLang } from '../../utils/languages'

export default function MySnippets({ lang, snippets }) {
	return (
		<>
			<Head>
				<title>{lang} - Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title={`${lang} - Snippets`} />

				{snippets &&
					snippets.map((snippet) => (
						<Snippet key={snippet.id} snippet={snippet} />
					))}
			</main>
		</>
	)
}

export const getServerSideProps = async (context) => {
	try {
		const lang = getFormatedLang(context.params.lang)
		const snippets = await getSnippetByLanguage(lang)
		return {
			props: { lang, snippets },
		}
	} catch (error) {
		console.error(error)
		context.res.statusCode = 302
		context.res.setHeader('Location', `/`)
		return { props: {} }
	}
}
