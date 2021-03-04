const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNA_SECRET })

const {
    Collection,
	Create,
	Delete,
	Documents,
	Get,
	Index,
    Lambda,
	Map: FMap,
    Match,
	Paginate,
	Ref,
    Var
} = faunadb.query

const getSnippets = async () => {
	try {
		const { data } = await faunaClient.query(
			FMap(
				Paginate(
					Documents(Collection('snippets'))
				),
				Lambda('ref', Get(Var('ref')))
			)
		)
	
		const snippets = data
			.map(snippet => {
				snippet.id = snippet.ref.id
				delete snippet.ref
				return snippet
			})
			.sort(({id:a}, {id:b}) => b - a)
	
		return snippets

	} catch (error) {
		console.log(error)
	}
}

const getSnippetById = async (id) => {
	try {
		const snippet = await faunaClient.query(
			Get(Ref(Collection('snippets'), id))
		)

		snippet.id = snippet.ref.id
		delete snippet.ref

		return snippet

	} catch (error) {
		console.log(error)
	}
}

const getSnippetByUserId = async (userId) => {
	try {
		const { data } = await faunaClient.query(
			FMap(
				Paginate(
					Match(Index('snippets_by_user'), userId)
				),
				Lambda('ref', Get(Var('ref')))
			)
		)

		const snippets = data
			.map(snippet => {
				snippet.id = snippet.ref.id
				delete snippet.ref
				return snippet
			})
			.sort(({id:a}, {id:b}) => b - a)
	
		return snippets

	} catch (error) {
		console.log(error)
	}
}

const getSnippetByLanguage = async (language) => {
	try {
		const { data } = await faunaClient.query(
			FMap(
				Paginate(
					Match(Index('snippets_by_language'), language)
				),
				Lambda('ref', Get(Var('ref')))
			)
		)

		const snippets = data
			.map(snippet => {
				snippet.id = snippet.ref.id
				delete snippet.ref
				return snippet
			})
			.sort(({id:a}, {id:b}) => b - a)
	
		return snippets

	} catch (error) {
		console.log(error)
	}
}

const createSnippet = async (code, language, description, name, userId) => {
	try {
		return await faunaClient.query(
			Create(
				Collection('snippets'), 
				{ data: { code, language, description, name, userId } }
			)
		)
	} catch (error) {
		console.log(error)
	}
}

const updateSnippet = async (id, code, language, name, description) => {
	try {
		return await faunaClient.query(
			Update(
				Ref(Collection('snippets'), id),
				{ data: { code, language, name, description } }
			)
		)
	} catch (error) {
		console.log(error)
	}
}

const deleteSnippet = async (id) => {
	try {
		return await faunaClient.query(
			Delete(Ref(Collection('snippets'), id))
		)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getSnippets,
	getSnippetById,
	getSnippetByUserId,
	getSnippetByLanguage,
	createSnippet,
	updateSnippet,
	deleteSnippet,
}
