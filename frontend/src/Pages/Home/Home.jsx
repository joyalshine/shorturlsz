import React from 'react'

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Feature from '../../Components/Features/Feature'

const features = [
    {
        name: 'Link Shortening',
        description:
            'Easily shorten long URLs into compact links that are easy to share and remember, optimizing your online presence.',
        icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
          </svg>
          )
      ,
    },
    {
        name: 'Data Sharing via Links',
        description:
            'Generate shareable links for quick access to shared data, allowing seamless sharing of Data',
        icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
          </svg>),
    },
    {
        name: 'Instant Chat through URLs',
        description:
            'Initiate real-time chats directly via unique URLs, enabling instant communication and collaboration with anyone, anywhere.',
        icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
          </svg>
          ),
    },
    {
        name: 'Easy Sharable Short Links',
        description:
            'Quickly create and share concise URLs, perfect for effortless sharing across platforms like social media, emails, and messages, enhancing accessibility and engagement.',
        icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
          </svg>
          ),
    },
]

function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();


    return (
        <div className="bg-white ">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="lg:h-7 sm:h-5 h-5 w-auto"
                                src="logo.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#feature-div" className="text-sm font-semibold leading-6 text-gray-900">
                            Features <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Links, Data, and Chats Made Simple
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                        Streamline your links, share data effortlessly, and chat instantly—all in one place. Simplify your online interactions with our integrated solutions.
                        </p>
                        <div className="mt-10 flex flex-wrap  items-center justify-center gap-x-6">
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate(`/link`)}>Link Shorten</button>
                            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"  onClick={() => navigate(`/chat`)}>Instant Chat</button>
                            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"  onClick={() => navigate(`/note`)}>Notes</button>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Instant Connections, Seamless Conversations
                            <br />
                            Start using our app today.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                        Engage in real-time chats directly through shared URLs, enabling instant communication and collaboration without barriers.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/chat"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </a>
                            {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a> */}
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        <img
                            className="absolute left-0 top-0 w-[40rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            src="chatui.png"
                            alt="App screenshot"
                            width={1824}
                            height={1080}
                        />
                    </div>
                </div>
            </div>
            <Feature features={features}/>



            <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
                <div className="mx-auto max-w-screen-xl text-center">
                    <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                                className="lg:h-7 sm:h-5 h-5 w-auto"
                                src="logo.png"
                                alt=""
                            />
                    </a>
                    <p className="my-6 text-gray-500 dark:text-gray-400">Effortlessly Simplifying Sharing, Linking, and Instant Chat.</p>
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024-2025 <a href="#" className="hover:underline">shorturlz</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </div>
    )
}

export default Home
