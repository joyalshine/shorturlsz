import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import { API_URL } from "../assets/dataAssets";
import { useLocation } from "react-router-dom";
import ChatIdContext from "./ChatIdContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState(0)
  
  const {chatId,setChatId} = useContext(ChatIdContext)

  useEffect(() => {
    if(chatId){
      const socket = io("http://localhost:8000", {
        query: {
          chatId
        }
      })
      
      setSocket(socket)

      socket.on("getOnlineUsers", (users) => {
        if(users != undefined || users != null) setOnlineUsers(users)
      })

      return () => socket.close()
    }
    else{
      if(socket) setSocket(null)
    }

  }, [chatId])

  return <SocketContext.Provider value={{ socket,onlineUsers }}>{children}</SocketContext.Provider>
}