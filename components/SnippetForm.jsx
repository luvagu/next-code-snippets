import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { defaultLangs } from '../utils/languages'

export default function SnippetForm({ snippet }) {
	const { register, handleSubmit, errors, reset } = useForm({
		defaultValues: {
			code: snippet ? snippet.data.code : '',
			language: snippet ? snippet.data.language : '',
			description: snippet ? snippet.data.description : '',
			name: snippet ? snippet.data.name : '',
		},
	})

	const router = useRouter()

	const createSnippet = async (data) => {
		const { code, language, description, name } = data

		try {
			await fetch('/api/createSnippet', {
				method: 'POST',
				body: JSON.stringify({ code, language, description, name }),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			router.push('/')
		} catch (err) {
			console.error(err)
		}
	}

	const updateSnippet = async (data) => {
		const { code, language, description, name } = data
		const id = snippet.id

		try {
			await fetch('/api/updateSnippet', {
				method: 'PUT',
				body: JSON.stringify({ code, language, description, name, id }),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			router.push('/')
		} catch (err) {
			console.error(err)
		}
	}

	const deleteSnippet = async () => {
		try {
			await fetch('/api/deleteSnippet', {
				method: 'DELETE',
				body: JSON.stringify({ id: snippet.id }),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			router.push('/')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<form onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}>
			<div className="mb-4">
				<label
					className="block text-white text-sm font-bold mb-1"
					htmlFor="name"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
					ref={register({ required: true })}
				/>
				{errors.name && (
					<p className="font-bold text-red-900">Name is required</p>
				)}
			</div>

			<div className="mb-4">
				<label
					className="block text-white text-sm font-bold mb-1"
					htmlFor="language"
				>
					Language
				</label>
				<select
					id="language"
					name="language"
					className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
					ref={register({ required: true })}
				>
					{defaultLangs &&
						defaultLangs.map((language, i) => (
							<option key={i} className="py-1">
								{language}
							</option>
						))}
				</select>
				{errors.language && (
					<p className="font-bold text-red-900">
						Language is required
					</p>
				)}
			</div>

			<div className="mb-4">
				<label
					className="block text-white text-sm font-bold mb-1"
					htmlFor="description"
				>
					Description
				</label>
				<textarea
					name="description"
					id="description"
					rows="3"
					className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					placeholder="What does the snippet do?"
					ref={register({ required: true })}
				></textarea>
				{errors.description && (
					<p className="font-bold text-red-900">
						Description is required.
					</p>
				)}
			</div>

			<div className="mb-4">
				<label
					className="block text-white text-sm font-bold mb-1"
					htmlFor="code"
				>
					Code
				</label>
				<textarea
					name="code"
					id="code"
					rows="10"
					className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					placeholder="ex. console.log('helloworld')"
					ref={register({ required: true })}
				></textarea>
				{errors.code && (
					<p className="font-bold text-red-900">Code is required.</p>
				)}
			</div>

			<button
				className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
				type="submit"
			>
				Save
			</button>

			<Link href="/">
				<a className="inline-block bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
					Cancel
				</a>
			</Link>

			{snippet && (
				<button
					onClick={deleteSnippet}
					className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
				>
					Delete
				</button>
			)}
		</form>
	)
}
