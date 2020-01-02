import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Routes } from './routes/Routes'

const { Footer, Content } = Layout

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content>
          <Routes />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </BrowserRouter>
  )
}

export default App
