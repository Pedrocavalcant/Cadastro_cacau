import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

  return (
    <div style={{padding: 24}}>
        <h1>Home</h1>
        <button onClick={() => navigate('/cadastro/cliente')}>Cadastro cliente</button>
    </div>
  )
}

export default Home