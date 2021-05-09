import { useState } from 'react'

export default function Code({ code }) {
	const [showCode, setShowCode] = useState(false)
	const [copyText, setCopyText] = useState('Copy')

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopyText('✅ Copied!')
			setTimeout(() => {
				setCopyText('Copy')
			}, 1000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<button
				className="bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2"
				type="submit"
				onClick={() => setShowCode(!showCode)}
			>
				{showCode ? 'Hide the Code' : 'Show the Code 👇'}
			</button>

			{showCode && (
				<div className="relative">
					<pre className="text-gray-800 bg-gray-300 rounded-md mb-2 px-4 py-2">
						{code}
					</pre>

					<button
						className="bg-gray-500 text-xs hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2 absolute top-0 right-0 transform -translate-x-1 translate-y-1"
						type="submit"
						onClick={copyCode}
					>
						{copyText}
					</button>
				</div>
			)}
		</div>
	)
}
