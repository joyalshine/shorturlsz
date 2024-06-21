import React, { createContext, useState } from 'react';

const ChatIdContext = createContext();

export const ChatIdContextContextProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null)

  return (
    <ChatIdContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatIdContext.Provider>
  );
};

export default ChatIdContext;
