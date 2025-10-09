import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

  return (
    <div style={{padding: 24}}>
        <h1>Home</h1>
        <button onClick={() => navigate('/cadastro/cliente')}>Cadastro Cliente</button>
        <button onClick={() => navigate('/cadastro/fazenda')}>Cadastro Fazenda</button>
        <button onClick={() => navigate('/cadastro/planta')}>Cadastro Planta</button>
    </div>
  )
}

export default Home