import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Chat from './Pages/Chat/Chat'
import LinkShorten from './Pages/LinkShorten/LinkShorten'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import Note from './Pages/Note/Note'
import NoteDisplay from './Pages/NoteDisplay/NoteDisplay'
import ChatDisplay from './Pages/ChatDisplay/ChatDisplay'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/link' element={<LinkShorten />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:chatId' element={<ChatDisplay />} />
        <Route path='/note' element={<Note />} />
        <Route path='/note/:noteId' element={<NoteDisplay />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
