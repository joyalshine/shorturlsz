import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import PageNotFound from '../PageNotFound/PageNotFound'
import { fetchProtectedLink, initialLinkCheck } from '../../api/linkFunctions'

const LinkDisplay = () => {
    const { linkId: id } = useParams()

    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")

    useEffect(() => {
        async function fetchData() {
            const response = await initialLinkCheck(id);
            const { status, destination } = response
            if (status) {
                if (response.protected) {
                    document.getElementById('passwordModal').showModal();
                }
                else {
                    window.location.href = destination;
                }
            }
            else {
                setIsLoadingPage(false)
            }
        }
        fetchData();

    }, [])

    const authenticate = async () => {
        if (password.trim().length == 0) {
            setPasswordErrorMsg("Enter the password")
            setPasswordError(true)
        }
        else {
            const { status, destination } = await fetchProtectedLink(id, password)
            if (status) {
                document.getElementById('passwordModal').close();
                window.location.href = destination;
            }
            else {
                setPasswordErrorMsg("Incorrect Password")
                setPasswordError(true)
            }
        }
    }

    return (
        <div>
            {isLoadingPage ? <LoadingScreen /> : <PageNotFound />}
            <dialog id="passwordModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Enter Password</h3>

                    <div className='flex moal-action justify-center mt-5'>
                        <div className="relative mb-1 w-2/3">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                                </svg>
                            </div>
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                                if (passwordError) setPasswordError(false)
                            }} id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                        </div>
                    </div>
                    <div className={passwordError ? "justify-center flex" : "justify-center flex hidden"}>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp! </span>{passwordErrorMsg}</p>
                    </div>

                    <div className="modal-action">
                        <button onClick={authenticate} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Submit
                            </span>
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default LinkDisplay
