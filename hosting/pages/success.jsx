import Link from 'next/link'
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Success({ children }) {
    return (
        <div className="px-4 sm:px-6 md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left flex items-center h-screen justify-center">
            <div>
                <CheckCircleIcon
                    className="w-full h-32 text-green-400"
                    aria-hidden="true"
                />
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-400 sm:text-5xl md:text-6xl text-center">
                    The data has successfully been submited please await your next email to login.
                </h1>
                <Link
                    href='/'
                    className="w-40 m-auto block rounded-md bg-gray-600 py-2 px-4 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 text-center">
                    Return to Home
                </Link>
            </div>
        </div>
    )
}