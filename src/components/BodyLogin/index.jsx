import React from 'react'
import style from './style.module.css'

const BodyLogin = ({ left, bgImage, children}) => {
  return (
    <div
        className={style.body}
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
      >
        <div className={style.cardContainer}>
          {/* Mantemos a área esquerda para conteúdo, mas sem a decoração laranja atrás */}
          <aside className={style.leftPanel}>{left}</aside>
          <main className={style.rightPanel}>
            <div className={style.cardRight}>
              {children}
            </div>
          </main>
        </div>
      </div>
  )
}

export default BodyLogin
