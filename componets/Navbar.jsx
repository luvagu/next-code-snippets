import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export default function Navbar() {
    const { user, isLoading } = useUser()
    return (
        <nav>
            <Link href='/'>
                <a className="text-2xl mb-2 block text-center text-white uppercase">
                    EveryDay Snippets
                </a>
            </Link>
            <div className="flex space-x-3 justify-center mb-6 m-x-auto">
                <Link href='/snippets/html'>
                    <a className="text-white hover:underline">HTML</a>
                </Link>
                <Link href='/snippets/css'>
                    <a className="text-white hover:underline">CSS</a>
                </Link>
                <Link href='/snippets/javascript'>
                    <a className="text-white hover:underline">JavaScript</a>
                </Link>
                <Link href='/snippets/python'>
                    <a className="text-white hover:underline">Python</a>
                </Link>
                
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
