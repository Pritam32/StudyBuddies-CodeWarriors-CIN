import React from 'react'

import Classes from './components/Classes'
import { VideoCall } from './components/VideoCall';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import FileShare from './components/FileShare';
import Nav from './components/Nav';
import Home from './components/Home';
import Study from './components/Study';
import Whiteboard from './components/Whiteboard';
import Todo from './components/Todo';
import Editor from './components/Editor';

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Home/>}/>
      <Route path='study' element={<Study/>}/>
      <Route path='classes' element={<Classes/>}/>
      <Route path='meeting' element={<VideoCall/>}/>
      <Route path='files' element={<FileShare/>}/>
      <Route path='todos' element={<Todo/>}/>
      <Route path='ide' element={<Editor/>}/>
      <Route path='whiteboard' element={<Whiteboard/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App;