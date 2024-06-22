import React from 'react'

const ChatBubble = (props) => {
    const { self, message, extend, time, sender } = props
    return (
        <div>
            {!self ?
                <div className="grid pb-0">
                    <div className="flex gap-2.5 mb-0">
                        {extend == false ? <img src={'/avatar_1.png'} alt="Shanay image" className="w-10 h-10" /> : <></>}
                        <div className={extend ? "grid pl-12" : "grid"}>
                            {extend == false ? <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">{sender}</h5> : <></>}
                            <div className="w-max grid">
                                <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                                    <h5 className="text-gray-900 text-sm font-normal leading-snug">{message}</h5>
                                </div>
                                <div className="justify-end items-center inline-flex mb-2.5">
                                    <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">{time}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex gap-2.5 justify-end pb-0">
                    <div className={extend ? "grid pr-12" : "grid"}>
                        <div className="grid mb-0">
                            {extend == false ? <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">You</h5> : <></>}
                            <div className="px-3 py-2 bg-indigo-600 rounded">
                                <h2 className="text-white text-sm font-normal leading-snug">{message}</h2>
                            </div>
                            <div className="justify-start items-center inline-flex">
                                <h4 className="text-gray-500 text-xs font-normal leading-4 py-1">{time}</h4>
                            </div>
                        </div>
                    </div>
                    {extend == false ? <img src={'/avatar_2.png'} alt="Hailey image" className="w-10 h-10" /> : <></>}
                </div>
            }
        </div>
    )
}

export default ChatBubble
