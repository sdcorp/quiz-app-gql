import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Routes } from './routes/Routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  )
}

export default App
