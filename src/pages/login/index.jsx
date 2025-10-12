import React from 'react'
import {  Lock, User } from 'lucide-react'
import HeaderLogin from '../../components/headerLogin'
import BodyLogin from '../../components/BodyLogin'
import cacau from '../../public/cacau.png'
import style from './style.module.css'

const WelcomeLeft = () => (
  <img src={cacau} alt="cacau" className={style.imagem}/>
)

export default function Login () {
  return (
    <>
      <HeaderLogin />
      <div className={style.pageBg} />

  <BodyLogin left={<WelcomeLeft />}>
        <div className={style.card}>
          {/* bloco vazio só para manter o mesmo recorte da imagem no mobile */}
          <div className={style.cardInner}>
            <form className={style.form} onSubmit={(e)=>e.preventDefault()}>
              <label className={style.inputLabel}>Usuário</label>
              <div className={style.inputGroup}>
                <User size={18} className={style.icon}/>
                <input
                  type="text"
                  className={style.input}
                />
              </div>

              <label className={style.inputLabel}>Senha</label>
              <div className={style.inputGroup}>
                <Lock size={18} className={style.icon}/>
                <input
                  type="password"
                  placeholder=""
                  className={style.input}
                />
              </div>

              <div className={style.footerCard}>
                <button className={style.loginBtn} type="submit">Log in</button>

                <span className={style.footerNote}>Primeira vez?</span>

                <button type="button" className={style.signupBtn}>
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
        </div>
  </BodyLogin>
    </>
  )
}
