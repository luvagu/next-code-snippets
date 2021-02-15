import { updateSnippetInDB } from '../../utils/faunaDB'

export default async function handler(req, res) {
	if (req.method !== 'PUT') {
		return res.status(405).json({ msg: 'Method not allowed' })
	}

	const { id, code, language, description, name } = req.body

	try {
		const updated = await updateSnippetInDB(id, code, language, name, description)
		return res.status(200).json(updated)
	} catch (err) {
		console.error(err)
		res.status(500).json({ msg: 'Something went wrong.' })
	}
}
