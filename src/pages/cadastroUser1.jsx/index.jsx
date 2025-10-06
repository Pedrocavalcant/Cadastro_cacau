import React from 'react'
import Logo from '../../assets/Logo.png'
import cacau from '../../public/cacau.png'
import Header from '../../components/Header'
import Body from '../../components/Body'
import style from './style.module.css'

const WelcomeLeft = () => {
  return (
    <>
        <img src={Logo} alt='Logo' />
        <div>
            <h2 style={{ lineHeight: 1.1}}>Bem-vindo</h2>
            <p style={{opacity:.8}}>Faça seu cadastro de forma fácil e rápida</p>
        </div>
    </>
  )
}

export default function CadastroCliente() {
    return(

    <>
        <Header/>
        <Body left={<WelcomeLeft />} bgImage={cacau}>
            <div className={style.containerInput}> 

                <div className={style.field}>
                    <label className={style.labelTitle}htmlFor="nome">Nome Completo</label>
                    <input clasName={style.input} type="text" name="nome" id="nome" />
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="usuario">Usuário</label>
                    <input clasName={style.input} type="text" name='usuario' id='usuario' />
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="email">E-mail</label>
                    <input clasName={style.input} type="text" name="email" id="email" />
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="senha">Senha</label>
                    <input clasName={style.input} type="text" name='senha' id='senha' />
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="conf_senha">Confirmar Senha</label>
                    <input clasName={style.input} type="text" name="conf_senha" id="conf_senha" />
                </div>

                <button className={style.buttonNext} type='button'>Proximo</button>
            </div>
        </Body>
    </>
    )
}

