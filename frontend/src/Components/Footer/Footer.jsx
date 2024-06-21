import React from 'react'



function Footer() {
    return (
        <footer className="p-4  md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        className="lg:h-7 sm:h-5 h-5 w-auto"
                        src="/logo.png"
                        alt=""
                    />
                </a>
                <p className="my-6 text-gray-500 dark:text-gray-400">Effortlessly Simplifying Sharing, Linking, and Instant Chat.</p>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024-2025 <a href="#" className="hover:underline">shorturlz</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer
