import React from 'react'

function Header({showFeature}) {
    return (
        <header className="p-2 top-0 z-50 bg-[#f9f9f9]">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="lg:h-7 sm:h-5 h-5 w-auto"
                            src="/logo.png"
                            alt=""
                        />
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {showFeature ? <a href="#feature-div" className="text-sm font-semibold leading-6 text-gray-900">
                        Features <span aria-hidden="true">&rarr;</span>
                    </a> : <></>}
                </div>
            </nav>

        </header>
    )
}

export default Header
