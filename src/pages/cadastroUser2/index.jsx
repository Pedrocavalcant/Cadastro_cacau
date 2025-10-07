import React from 'react'
import Logo from '../../assets/Logo.png'
import cacau from '../../public/cacau.png'
import Header from '../../components/Header'
import Body from '../../components/Body'

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
            <div>
                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" name='cpf' id='cpf'/>
                </div>

                <div>
                    <label htmlFor="celular">Número de celular</label>
                    <input type="text" name='celular' id='celular'/>
                </div>

                <div>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" name='rua' id='rua'/>
                </div>

                <div>
                    <div>
                        <label htmlFor="numCasa">N° da casa</label>
                        <input type="text" name='numCasa' id='numCasa'/>
                    </div>
                    <div>
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" name='bairro' id='bairro'/>
                    </div>
                </div>

                <div>
                    <div>Cidade</div>
                    <div>UF</div>
                </div>

            </div>
        </Body>
    </div>
  )
}

export default CadastroCliente2