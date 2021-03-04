import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { defaultLangs } from '../utils/languages'

export default function Navbar() {
    const { user, isLoading } = useUser()
    return (
        <nav>
            <Link href='/'>
                <a className="text-2xl mb-2 block text-center text-white uppercase">
                    EveryDay Snippets
                </a>
            </Link>
            <div className="flex space-x-3 justify-center items-center mb-6 m-x-auto">
                {defaultLangs && defaultLangs.map((language, i) => (
                    <Link key={i} href={`/snippets/${language.toLocaleLowerCase()}`}>
                        <a className="text-gray-400 hover:underline">{language}</a>
                    </Link>
                ))}
                
                {!isLoading && !user && (
                    <Link href='/api/auth/login'>
                        <a className="text-white hover:underline">Log In</a>
                    </Link>
                )}

                {!isLoading && user && (
                    <>
                        <Link href='/my-snippets'>
                            <a className="text-white hover:underline">My Snippets</a>
                        </Link>
                        <Link href='/api/auth/logout'>
                            <a className="text-white hover:underline">Log Out</a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
