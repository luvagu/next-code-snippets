import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { updateSnippet, getSnippetById } from '../../utils/fauna.helpers'

export default withApiAuthRequired(async function handler(req, res) {
	const session = getSession(req, res)
	const userId = session.user.sub

	if (req.method !== 'PUT') {
		return res.status(405).json({ msg: 'Method not allowed' })
	}

	const { id, code, language, description, name } = req.body
	const existingRecord = await getSnippetById(id)

	if (!existingRecord || existingRecord.data.userId !== userId) {
		return res.status(404).json({ msg: 'Record not found.' })
	}

	try {
		const updated = await updateSnippet(id, code, language, name, description)
		return res.status(200).json(updated)
	} catch (err) {
		console.error(err)
		res.status(500).json({ msg: 'Something went wrong.' })
	}
})
