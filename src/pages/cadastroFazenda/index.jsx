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
        <h2 style={{lineHeight: 1.1}}>Cadastro de fazenda</h2>
      </div>
    </>
  )
}



export default function CadastroFazenda() {
  
  return (
    <>
      <Header/>
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div></div>
      </Body>
    </>
  )
}

