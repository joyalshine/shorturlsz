import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'
import ConversationContext from '../context/ConversationContext'

const useListenMessages = () => {
    const { socket } = useContext(SocketContext)
    const { messageHistory, setMessageHistory } = useContext(ConversationContext)

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessageHistory([...messageHistory, newMessage])
        })

        return () => socket?.off('newMessage')
    }, [socket,messageHistory,setMessageHistory])
}

export default useListenMessages
