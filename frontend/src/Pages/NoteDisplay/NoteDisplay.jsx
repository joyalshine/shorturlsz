import React from 'react'
import { useParams } from 'react-router-dom';


import { useState, useEffect } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PageNotFound from '../PageNotFound/PageNotFound';
import { fetchProtectedNote, initialNoteCheck } from '../../api/NoteFunctions';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function NoteDisplay() {
    const { noteId: id } = useParams()

    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [isAuthLoadingPage, setIsAuthLoadingPage] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [note, setNote] = useState("")

    useEffect(() => {
        async function fetchData() {
            const response = await initialNoteCheck(id);
            const { status, protected: isProtected, data } = response
            if (status) {
                if (isProtected) {
                    setIsValid(true)
                    document.getElementById('passwordModal').showModal();
                }
                else {
                    setNote(data)
                    setIsValid(true)
                    setIsLoadingPage(false)
                }
            }
            else {
                setIsValid(false)
                setIsLoadingPage(false)
            }
        }
        fetchData();

    }, [])

    useEffect(() => {
        if (note != "") {
            const textarea = document.getElementById('autoResizeTextarea');
            textarea.style.height = (textarea.scrollHeight) + 'px';
        }
    }, [note])


    const authenticate = async () => {
        setIsAuthLoadingPage(true)
        if (password.trim().length == 0) {
            setPasswordErrorMsg("Enter the password")
            setPasswordError(true)
        }
        else {
            const { status, data } = await fetchProtectedNote(id, password)
            if (status) {
                document.getElementById('passwordModal').close();
                setNote(data)
                setIsValid(true)
                setIsLoadingPage(false)
            }
            else {
                setPasswordErrorMsg("Incorrect Password")
                setPasswordError(true)
            }
        }
        setIsAuthLoadingPage(false)
    }

    return (
        <>
            {isLoadingPage ? <LoadingScreen /> : isValid ?
                <div className="bg-[#f9f9f9] min-h-[100vh]">
                    <Header showFeature={false} />
                    <div className="relative isolate px-6 pt-1 lg:px-8 mt-18 sm:mt-0">
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
                        <div className="mx-auto max-w-7xl py-2 pb-5 sm:px-6 sm:pt-32 lg:px-8 flex items-center justify-center">
                            <div className="relative isolate overflow-hidden bg-gray-900 px-2 pt-1 w-full shadow-2xl rounded-2xl sm:rounded-3xl sm:px-5 md:pt-2 lg:flex  lg:px-8 lg:pt-0">
                                <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-2 lg:text-left">
                                    <textarea value={note} id='autoResizeTextarea' className="overflow-y-hidden h-full  w-full textarea bg-transparent text-white leading-snug resize-none " placeholder="Enter the data here...."></textarea>
                                    {/* <textarea value={note} className="h-64 sm:h-48 md:h-64 lg:h-96 xl:h-128 w-full textarea bg-transparent text-white leading-snug resize-none " placeholder="Enter the data here...."></textarea> */}
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



                    <Footer />


                </div> : <PageNotFound />}
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
                        {/* <form method="dialog"> */}
                        <button onClick={authenticate} disabled={isAuthLoadingPage} className=" cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            {isAuthLoadingPage ? <svg aria-hidden="true" role="status" className="inline w-4 h-4  text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg> : <>Submit</>}
                        </button>
                        {/* </form> */}
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default NoteDisplay
