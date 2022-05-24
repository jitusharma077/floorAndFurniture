import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login'

const CommonRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default CommonRoutes