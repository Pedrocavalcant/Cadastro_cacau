import React from 'react'
import style from './style.module.css'
import Header from '../Header'

const HeaderLogin = () => {
  return (
    <div>
        <Header/>
        <div className={style.header}></div>
    </div>
  )
}

export default HeaderLogin