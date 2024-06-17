import React from 'react'
import { useState } from 'react'
import { createNewChatURL, verifyURLFromDB } from '../../api/chatFunctions'
import { WEBSITE_URL } from '../../assets/dataAssets'
const navigation = [
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

    const {url,status} = await createNewChatURL(dataToSend)
    if(status){
      seturlVerified(false)
      setmodalURL(WEBSITE_URL + url)
      document.getElementById('my_modal_1').showModal();
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
    <div className="bg-white">
      <header className="absolute inset-x-0 lg:top-0 z-50 top-0">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
              LinkPaste
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>


      <div className="mx-auto max-w-lg py-1 sm:px-6 sm:py-5 lg:px-8 flex mt-24 items-center justify-center">

        <form className='w-full'>

          <div className="mb-7">
            <label for="error" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select URL type</label>
            <div class="flex">
              <div class="flex items-center me-4">
                <input id="inline-radio" type="radio" value="" name="inline-radio-group" checked={customURL} onChange={(e) => setCustomURL(true)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
              </div>
              <div class="flex items-center me-4">
                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" checked={!customURL} onChange={(e) => setCustomURL(false)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Random</label>
              </div>
            </div>
          </div>

          <div class={customURL == true ? "mb-7" : "mb-7 hidden"}>
            <label for="error" class={"block mb-2 text-sm font-medium " + (urlError ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-white")}>Enter URL</label>
            <div class="flex">
              <div class="flex-shrink-0 z-10 inline-flex mr-0.5 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">linkpaste/note/ </div>
              <div class="relative w-full">
                <input type="search" id="search-dropdown" value={URL} onChange={(e) => {
                  setURL(e.target.value)
                  if (urlVerified) seturlVerified(false)
                }} class={urlError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-e-lg rounded-s-gray-100 rounded-s-2 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"} placeholder="url" required />
                
                <button type="button" disabled={urlVerified || isLoadingVerify} onClick={verifyURL} class={urlVerified ? "absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-e-lg inline-flex items-center" : "absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"}>
                  {urlVerified ? <><svg class="w-6 h-6 mr-1 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>Verified</> : isLoadingVerify ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg> Verifying</> : "Verify"}
                </button>
              </div>
            </div>
            <p class={"mt-2 text-sm " + (urlError ? "text-red-600 dark:text-red-500" : "hidden")}><span class="font-medium">Oh, snapp!</span> {urlErrorMsg}</p>
          </div >
          <div class="mb-5">
            <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" checked={passwordProtection} onChange={(e) => setPasswordProtection(e.target.checked)} class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Password Protection</span>
            </label>
          </div>
          <div class={passwordProtection == true ? "" : "hidden"}>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" class={passwordError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="•••••••••" required />
              <p class={"mt-2 text-sm " + (passwordError ? "text-red-600 dark:text-red-500" : "hidden")}><span class="font-medium">Oh, snapp!</span> {passwordErrorMsg}</p>
            </div>
            <div class="mb-6">
              <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm_password" class={passwordError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="•••••••••" required />
              <p class={"mt-2 text-sm " + (passwordError ? "text-red-600 dark:text-red-500" : "hidden")}><span class="font-medium">Oh, snapp!</span> {passwordErrorMsg}</p>
            </div>
          </div>

          <div class="flex justify-end">
            <button disabled={isLoadingSubmit} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center" onClick={submit}>
              {isLoadingSubmit ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>Loading...</> : "Submit"}
            </button>
          </div>
        </form >

      </div >





      <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
        <div class="mx-auto max-w-screen-xl text-center">
          <p class="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
          <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
            </li>
          </ul>
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2021-2022 <a href="#" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
        </div>
      </footer>


      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">URL</h3>

          <div className='modal-action justify-center'>
            <div class="w-full max-w-[20rem]">
              <div class="relative ">
                <label for="npm-install-copy-text" class="sr-only">Label</label>
                <input id="npm-install-copy-text" type="text" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={modalURL} disabled readonly />
                <button data-copy-to-clipboard-target="npm-install-copy-text" class="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                  <span id="default-message" class="hidden inline-flex items-center">
                    <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <span class="text-xs font-semibold">Copy</span>
                  </span>
                  <span id="success-message" class=" inline-flex items-center">
                    <svg class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                    <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
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
