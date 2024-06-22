import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { useParams } from 'react-router-dom'
import { initialChatCheck, fetchProtectedChat, sendNewMessage } from '../../api/chatFunctions';
import { useCookies } from "react-cookie";

import PageNotFound from '../PageNotFound/PageNotFound'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ChatIdContext from '../../context/ChatIdContext';
import { SocketContext } from '../../context/SocketContext';
import ConversationContext from '../../context/ConversationContext';
import useListenMessages from '../../hooks/useListenMessages';

import ChatBubble from '../../Components/ChatBubble/ChatBubble';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { v4 as uuid } from "uuid";

const navigation = [
]

function ChatDisplay() {
    const { chatId: id } = useParams()
    useListenMessages()

    const { chatId, setChatId } = useContext(ChatIdContext)
    const [isAuthLoadingPage, setIsAuthLoadingPage] = useState(false)
    const { socket, onlineUsers } = useContext(SocketContext)
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")
    const [isSendBtnLoading, setIsSendBtnLoading] = useState(true)

    const [newMessage, setNewMessage] = useState("")

    const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
    const { messageHistory, setMessageHistory } = useContext(ConversationContext)

    useEffect(() => {
        async function fetchData() {
            const response = await initialChatCheck(id);
            const { status, message } = response
            if (status) {
                if (response.protected) {
                    document.getElementById('passwordModal').showModal();
                }
                else {
                    setChatId(id)
                    setMessageHistory(message)
                    let tokens = cookies.user_token
                    if (tokens && tokens[id]) {
                        let userData = tokens[id]
                        setUsername(userData.name)
                        setUserId(userData.id)
                        setIsLoadingPage(false)
                        setIsValid(true)
                    }
                    else {
                        setIsValid(true)
                        document.getElementById('nameModal').showModal();
                    }
                }
            }
            else {
                setIsLoadingPage(false)
                setIsValid(false)
            }
        }
        fetchData();

        return () => setChatId(null)
    }, [])


    const authenticate = async () => {
        setIsAuthLoadingPage(true)
        if (password.trim().length == 0) {
            setPasswordErrorMsg("Enter the password")
            setPasswordError(true)
        }
        else {
            const { status, message } = await fetchProtectedChat(id, password)
            if (status) {
                setChatId(id)
                setMessageHistory(message)
                document.getElementById('passwordModal').close();
                setIsValid(true)
                setIsLoadingPage(false)

                let tokens = cookies.user_token
                if (tokens && tokens[id]) {
                    let userData = tokens[id]
                    setUsername(userData.name)
                    setUserId(userData.id)
                }
                else {
                    document.getElementById('nameModal').showModal();
                }
            }
            else {
                setPasswordErrorMsg("Incorrect Password")
                setPasswordError(true)
            }
        }
        setIsAuthLoadingPage(false)
    }

    const setUsernameFunction = () => {
        let tokens = cookies.user_token
        if (!tokens) tokens = {}
        let expires = new Date()
        let uniqueId = uuid().substring(0, 8)
        expires.setTime(expires.getTime() + (48 * 60 * 60 * 1000))
        removeCookie("user_token")
        if (username) {
            tokens[id] = {
                name: username,
                id: uniqueId + "%%" + username
            }
            setCookie('user_token', tokens, { path: '/', expires })
            setUserId(uniqueId + "%%" + username)
        }
        else {
            setUsername("anonymous")
            tokens[id] = {
                name: "anonymous",
                id: uniqueId + "%%anonymous"
            }
            setCookie('user_token', tokens, { path: '/', expires })
            setUserId(uniqueId + "%%anonymous")
        }
        document.getElementById('nameModal').close();
        setIsLoadingPage(false)
    }

    const sendMessage = async () => {
        setIsSendBtnLoading(true)
        if (newMessage.trim().length == 0) { }
        else {
            const { status } = await sendNewMessage(id, userId, newMessage)
            if (status) {
                setMessageHistory([...messageHistory, { senderId: userId, message: newMessage, createdAt: new Date() }])
                setNewMessage("")

                var objDiv = document.getElementById("message-container");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        }
        setIsSendBtnLoading(false)
    }


    return (
        <>
            {isLoadingPage ? <LoadingScreen /> : isValid ? <div className="bg-[#f9f9f9]">
                <Header showFeature={false} />
                <div className="relative isolate px-6 pt-1 lg:px-8 mt-24 sm:mt-0">
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
                    <div className="mx-auto max-w-5xl sm:w-4/5 w-full  py-2 sm:px-6 sm:py-32 lg:px-8 flex items-center justify-center">
                        <div className="relative isolate overflow-hidden bg-white w-full shadow-2xl rounded-2xl sm:rounded-3xl   lg:pt-0">
                            <div className="w-full h-14 flex" style={{ backgroundColor: "#2d9afa" }}>
                                <div className='w-[30%] items-center flex justify-center text-cornsilk text-[1.4rem] font-bold'>Chat</div>
                                <div className='items-center flex '>
                                    <span className="inline-flex items-center bg-green-100 text-green-500 text-xs font-medium ml-1 px-2 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 mr-1 bg-green-400 rounded-full"></span>
                                        Online <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full"> {onlineUsers.length}</span>
                                    </span>
                                </div>
                            </div>
                            <div className={messageHistory.length == 0 ? "mx-auto h-64 sm:h-48 md:h-64 lg:h-96 xl:h-128 sm:px-10 lg:mx-0 lg:flex-auto lg:py-2 overflow-y-scroll pb-4 scroll-smooth scrollbar items-center justify-center flex" : "mx-auto h-64 sm:h-48 md:h-64 lg:h-96 xl:h-128 sm:px-10 px-2 lg:mx-0 lg:flex-auto py-2 lg:py-2 overflow-y-scroll pb-4 scroll-smooth scrollbar"} id='message-container'>
                                {messageHistory.length == 0 ? (<div>No Messages to Show</div>) : (messageHistory.map((item, indx) => {
                                    const extend = indx == 0 ? false : messageHistory[indx - 1].senderId == item.senderId
                                    const date = new Date(item.createdAt)
                                    const time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM")
                                    return (<ChatBubble self={item.senderId == userId} message={item.message} extend={extend} time={time} sender={item.senderId.split("%%")[1]} />)
                                }))}
                            </div>
                            <div className="w-full h-14 flex pr-4 pl-4 pb-4 mt-2">
                                <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
                                    <form action="" className='flex w-full justify-betwwen' onSubmit={(e) => { e.preventDefault() }}>
                                        <div className="flex items-center gap-2 w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <g id="User Circle">
                                                    <path id="icon" d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z" stroke="#4F46E5" strokeWidth="1.6" />
                                                </g>
                                            </svg>
                                            <input className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type here..." />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={sendMessage} disabled={isSendBtnLoading} type='submit' className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow ">
                                                {isSendBtnLoading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg></> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <g id="Send 01">
                                                        <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                                                    </g>
                                                </svg>}
                                                <h3 className="text-white text-xs font-semibold leading-4 px-2">{isSendBtnLoading ? "Sending" : "Send"}</h3>
                                            </button>
                                        </div>
                                    </form>
                                </div>
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
                        <button onClick={authenticate} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Submit
                            </span>
                        </button>
                        {/* </form> */}
                    </div>
                </div>
            </dialog>
            <dialog id="nameModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Enter Name (Optional)</h3>

                    <div className='flex moal-action justify-center mt-5'>
                        <div className="relative mb-1 w-2/3">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>
                            <input type="text" value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }} id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc.." />
                        </div>
                    </div>
                    <div className={passwordError ? "justify-center flex" : "justify-center flex hidden"}>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp! </span>{passwordErrorMsg}</p>
                    </div>

                    <div className="modal-action">
                    <button onClick={authenticate} disabled={isAuthLoadingPage} className=" cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            {isAuthLoadingPage ? <svg aria-hidden="true" role="status" className="inline w-4 h-4  text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg> : <>Submit</>}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ChatDisplay
