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
        <div>

          <div>
            <div>
              <label htmlFor="nFazenda">Nome da Fazenda</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="espPredominante">Espécie Predominante</label>
              <select name="espPredominante" id="espPredominante">
                <option value="Forasteiro">Forasteiro</option>
                <option value="Trinitário">Trinitário</option>
                <option value="Criollo">Criollo</option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="sisProdutivo">Sistema Produtivo</label>
              <select name="sisProdutivo" id="sisProdutivo"></select>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="Produtivo">Propietário</label>
              <input type="text" />
            </div>

            <div>
              <label htmlFor="divPlantio">Divisão de plantio</label>
              <select name="divPlantio" id="divPlantio"></select>
            </div>
          </div>

          <div>
            <label htmlFor="areaCultivo">Área de cultivo</label>
            <input type="text" />
          </div>

        </div>
      </Body>
    </>
  )
}

