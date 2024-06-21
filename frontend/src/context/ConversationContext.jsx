import React, { createContext, useState } from 'react';

const ConversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState([])

  return (
    <ConversationContext.Provider value={{ messageHistory, setMessageHistory }}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;