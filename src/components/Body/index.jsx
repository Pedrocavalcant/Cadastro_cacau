import React, { Children } from 'react'
import style from './style.module.css'

const Body = ({ left, bgImage, children}) => {
  return (
    <div
        className={style.body}
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
      >
        <div className={style.cardContainer}>
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

export default Body