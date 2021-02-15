const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNA_SECRET })
const query = faunadb.query

const getSnippets = async () => {
	try {
		const { data } = await faunaClient.query(
			query.Map(
				query.Paginate(query.Documents(query.Collection('snippets'))),
				query.Lambda('ref', query.Get(query.Var('ref')))
			)
		)
	
		const snippets = data
			.map(snippet => {
				snippet.id = snippet.ref.id
				delete snippet.ref
				return snippet
			})
			// .sort(({id:a}, {id:b}) => b - a)
	
		return snippets

	} catch (error) {
		console.log(error)
	}
}

const getSnippetById = async (id) => {
	try {
		const snippet = await faunaClient.query(
			query.Get(query.Ref(query.Collection('snippets'), id))
		)

		snippet.id = snippet.ref.id
		delete snippet.ref

		return snippet

	} catch (error) {
		console.log(error)
	}
}

const createSnippet = async (code, language, description, name) => {
	try {
		return await faunaClient.query(
			query.Create(query.Collection('snippets'), {
				data: { code, language, description, name },
			})
		)
	} catch (error) {
		console.log(error)
	}
}

const updateSnippet = async (id, code, language, name, description) => {
	try {
		return await faunaClient.query(
			query.Update(query.Ref(query.Collection('snippets'), id), {
				data: { code, language, name, description },
			})
		)
	} catch (error) {
		console.log(error)
	}
}

const deleteSnippet = async (id) => {
	try {
		return await faunaClient.query(
			query.Delete(query.Ref(query.Collection('snippets'), id))
		)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getSnippets,
	getSnippetById,
	createSnippet,
	updateSnippet,
	deleteSnippet,
}
