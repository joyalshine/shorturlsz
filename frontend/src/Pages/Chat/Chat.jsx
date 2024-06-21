import React from 'react'
import { useState } from 'react'
import { createNewChatURL, verifyURLFromDB } from '../../api/chatFunctions'
import { WEBSITE_URL } from '../../assets/dataAssets'
import Feature from '../../Components/Features/Feature'
import Header from '../../Components/Header/Header'


const features = [
  {
    name: 'Link Shortening',
    description:
      'Easily shorten long URLs into compact links that are easy to share and remember, optimizing your online presence.',
    icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
    </svg>
    )
    ,
  },
  {
    name: 'Data Sharing via Links',
    description:
      'Generate shareable links for quick access to shared data, allowing seamless sharing of Data',
    icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
    </svg>),
  },
  {
    name: 'Instant Chat through URLs',
    description:
      'Initiate real-time chats directly via unique URLs, enabling instant communication and collaboration with anyone, anywhere.',
    icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
    ),
  },
  {
    name: 'Easy Sharable Short Links',
    description:
      'Quickly create and share concise URLs, perfect for effortless sharing across platforms like social media, emails, and messages, enhancing accessibility and engagement.',
    icon: (<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
    </svg>
    ),
  },
]

function Chat() {

  const [urlError, seturlError] = useState(null)
  const [urlErrorMsg, seturlErrorMsg] = useState("")
  const [customURL, setCustomURL] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
  const [urlVerified, seturlVerified] = useState(false)
  const [isLoadingSubmit, setisLoadingSubmit] = useState(false)
  const [isLoadingVerify, setisLoadingVerify] = useState(false)
  const [passwordProtection, setPasswordProtection] = useState(false)

  const [URL, setURL] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [modalURL, setmodalURL] = useState("")
  const [copied, setCopied] = useState(false)

  const submit = async () => {
    let dataToSend = {}
    dataToSend["customURL"] = customURL;
    if (customURL) {
      if (URL.trim().length == 0) {
        seturlErrorMsg("Enter some URL")
        seturlError(true);
        return
      }
      if (urlVerified) {
        dataToSend["url"] = URL;
      }
      else {
        let response = await verifyURLFromDB(URL)
        if (!response.verified) {
          seturlErrorMsg("URL already taken")
          setURL("")
          seturlError(true);
          return
        }
        else {
          dataToSend["url"] = URL;
          seturlError(false);
        }
      }
    }
    dataToSend["protected"] = passwordProtection;
    if (passwordProtection) {
      if (password != confirmPassword) {
        setPasswordError(true)
        setPasswordErrorMsg("Passwords does not match")
        return;
      }
      else {
        dataToSend["password"] = password
        setPasswordError(false)
      }
    }

    const { url, status } = await createNewChatURL(dataToSend)
    if (status) {
      seturlVerified(false)
      setmodalURL(WEBSITE_URL + url)
      document.getElementById('my_modal_1').showModal();
    }
  }

  const copyToClipboard = () => {
    if (!copied) {
      const textInput = document.getElementById('copy-text');
      textInput.select();
      textInput.setSelectionRange(0, 99999);
      try {
        navigator.clipboard.writeText(textInput.value);
        setCopied(true)
        setTimeout(() => setCopied(false), 8000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  }

  const verifyURL = async () => {
    setisLoadingVerify(true);
    if (URL.trim().length == 0) {
      seturlErrorMsg("Enter some URL")
      seturlError(true);
    }
    else {
      const { verified } = await verifyURLFromDB(URL)
      if (!verified) {
        seturlErrorMsg("URL already taken")
        setURL("")
        seturlError(true);
      }
      else {
        seturlVerified(true)
        seturlError(false);
      }
    }
    setisLoadingVerify(false);
  }

  return (
    <div className="bg-[#f9f9f9]">
      <Header />


      <div className="mx-3 rounded-md sm:mx-auto max-w-xl py-3 sm:px-6 sm:py-5 lg:px-8 flex  mt-[4rem] sm:mt-20 items-center justify-center bg-white" style={{ boxShadow: '0 1px 4px #ccc' }}>

        <form className='min-w-[70%] sm:w-[min-content] '>

          <div className="mb-7">
            <label htmlFor="error" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select URL type</label>
            <div className="flex">
              <div className="flex items-center me-4">
                <input id="inline-radio" type="radio" value="" name="inline-radio-group" checked={customURL} onChange={(e) => setCustomURL(true)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
              </div>
              <div className="flex items-center me-4">
                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" checked={!customURL} onChange={(e) => setCustomURL(false)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Random</label>
              </div>
            </div>
          </div>

          <div className={customURL == true ? "mb-7" : "mb-7 hidden"}>
            <label htmlFor="error" className={"block mb-2 text-sm font-medium " + (urlError ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-white")}>Enter URL</label>
            <div className="flex">
              <div className="flex-shrink-0 z-10 inline-flex mr-0.5 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">{WEBSITE_URL + "chat/"}</div>
              <div className="relative w-full">
                <input type="search" id="search-dropdown" value={URL} onChange={(e) => {
                  setURL(e.target.value)
                  if (urlVerified) seturlVerified(false)
                }} className={urlError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-e-lg rounded-s-gray-100 rounded-s-2 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"} placeholder="url" required />

                <button type="button" disabled={urlVerified || isLoadingVerify} onClick={verifyURL} className={urlVerified ? "absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-e-lg inline-flex items-center" : "absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"}>
                  {urlVerified ? <><svg className="w-6 h-6 mr-1 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>Verified</> : isLoadingVerify ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg> Verifying</> : "Verify"}
                </button>
              </div>
            </div>
            <p className={"mt-2 text-sm " + (urlError ? "text-red-600 dark:text-red-500" : "hidden")}><span className="font-medium">Oh, snapp!</span> {urlErrorMsg}</p>
          </div >
          <div className="mb-5">
            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" checked={passwordProtection} onChange={(e) => setPasswordProtection(e.target.checked)} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Password Protection</span>
            </label>
          </div>
          <div className={passwordProtection == true ? "" : "hidden"}>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className={passwordError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="•••••••••" required />
              <p className={"mt-2 text-sm " + (passwordError ? "text-red-600 dark:text-red-500" : "hidden")}><span className="font-medium">Oh, snapp!</span> {passwordErrorMsg}</p>
            </div>
            <div className="mb-6">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm_password" className={passwordError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="•••••••••" required />
              <p className={"mt-2 text-sm " + (passwordError ? "text-red-600 dark:text-red-500" : "hidden")}><span className="font-medium">Oh, snapp!</span> {passwordErrorMsg}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button disabled={isLoadingSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center" onClick={submit}>
              {isLoadingSubmit ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>Loading...</> : "Submit"}
            </button>
          </div>
        </form >

      </div >

      <Feature features={features} />


      <footer className="p-4  md:p-8 lg:p-10 dark:bg-gray-800">
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


      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">URL</h3>

          <div className='modal-action justify-center'>
            <div className="w-full max-w-[20rem]">
              <div className="relative ">
                <label htmlFor="npm-install-copy-text" className="sr-only">Label</label>
                <input id="copy-text" type="text" className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={modalURL} disabled readOnly />
                <button data-copy-to-clipboard-target="npm-install-copy-text" onClick={copyToClipboard} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                  <span id="default-message" className={copied ? "hidden inline-flex items-center" : "inline-flex items-center"}>
                    <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <span className="text-xs font-semibold">Copy</span>
                  </span>
                  <span id="success-message" className={copied ? " inline-flex items-center" : "hidden inline-flex items-center"}>
                    <svg className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => window.location.reload()}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div >
  )
}

export default Chat
