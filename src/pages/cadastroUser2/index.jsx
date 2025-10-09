import React from 'react'
import Logo from '../../assets/Logo.png'
import cacau from '../../public/cacau.png'
import Header from '../../components/Header'
import Body from '../../components/Body'
import style from './style.module.css'

const WelcomeLeft = () => {
    return(
        <>
            <img src={Logo} alt="Logo" />
            <div>
                <h2 style={{ lineHeight: 1.1}}>Bem-vindo</h2>
                <p style={{ opacity: .8 }}>Faça seu cadastro de forma fácil e rápida</p>
            </div>
        </>
    )
}

const CadastroCliente2 = () => {
  return (
    <div>
        <Header/>
        <Body left={<WelcomeLeft/>} bgImage={cacau}>
            <div className={style.containerInput}>
                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="cpf">CPF</label>
                    <input className={style.input} type="text" name='cpf' id='cpf'/>
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="celular">Número de celular</label>
                    <input className={style.input} type="text" name='celular' id='celular'/>
                </div>

                <div className={style.field}>
                    <label className={style.labelTitle} htmlFor="rua">Rua</label>
                    <input className={style.input} type="text" name='rua' id='rua'/>
                </div>

                <div className={style.containerField}>
                    <div className={style.field} style={{flex: .4}}>
                        <label className={style.labelTitle} htmlFor="numCasa">N° da casa</label>
                        <input className={style.input} type="text" name='numCasa' id='numCasa'/>
                    </div>
                    <div className={style.field} style={{flex: .6}}>
                        <label className={style.labelTitle} htmlFor="bairro">Bairro</label>
                        <input className={style.input} type="text" name='bairro' id='bairro'/>
                    </div>
                </div>

                <div className={style.containerField}>
                    <div className={style.field} style={{flex: .6}}>
                        <label className={style.labelTitle} htmlFor="cidade">Cidade</label>
                        <input className={style.input} type="text" name='cidade' id='cidade'/>
                    </div>
                    <div className={style.field} style={{flex: .4}}>
                        <label className={style.labelTitle} htmlFor="uf">UF</label>
                        <input className={style.input} type="text" name='uf' id='uf'/>
                    </div>
                </div>

            </div>
        </Body>
    </div>
  )
}

export default CadastroCliente2