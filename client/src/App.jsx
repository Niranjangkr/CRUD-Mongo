import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home, Register, Profile, Edit } from './pages';
import { Headers } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />
      </Routes>     
    </>
  )
}

export default App
