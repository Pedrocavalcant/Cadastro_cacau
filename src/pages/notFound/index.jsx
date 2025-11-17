import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import style from './style.module.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.errorCode}>404</div>
          
          <h1 className={style.title}>Página não encontrada</h1>
          
          <p className={style.description}>
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          
          <div className={style.icon}>
            <span>🔍</span>
          </div>
          
          <div className={style.actions}>
            <button
              onClick={() => navigate('/')}
              className={style.primaryBtn}
            >
              Voltar à Home
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className={style.secondaryBtn}
            >
              Página Anterior
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NotFound