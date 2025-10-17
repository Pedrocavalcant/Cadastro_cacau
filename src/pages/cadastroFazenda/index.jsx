import React, { useState } from "react"
import Logo from "../../assets/Logo.png"
import cacau from "../../public/cacau.png"
import Header from "../../components/Header"
import Body from "../../components/Body"
import style from "./style.module.css"
import { useNavigate } from "react-router-dom"

const WelcomeLeft = () => {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <div>
        <h2 style={{ lineHeight: 1.1 }}>Cadastro de fazenda</h2>
      </div>
    </>
  )
}

export default function CadastroFazenda() {
  const [nomeFazenda, setNomeFazenda] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [proprietario, setProprietario] = useState("")
  const [areaCultivo, setAreaCultivo] = useState("")
  const [especiePredominante, setEspeciePredominante] = useState("")
  const [sistemaProdutivo, setSistemaProdutivo] = useState("")
  const [divisaoPlantio, setDivisaoPlantio] = useState("")

  const isNomeFazenda = nomeFazenda.trim().length > 0
  const isCnpj = cnpj.trim().length > 13
  const isProprietario = proprietario.trim().length > 0
  const isAreaCultivo = areaCultivo.trim().length > 0
  const isEspeciePredominante = especiePredominante !== ""
  const isSistemaProdutivo = sistemaProdutivo !== ""
  const isDivisaoPlantio = divisaoPlantio !== ""

  const isFormValid = isNomeFazenda && isCnpj && isProprietario && isAreaCultivo && isEspeciePredominante && isSistemaProdutivo && isDivisaoPlantio


  const navigate = useNavigate()
  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.containerInput}>
          {/* Linha 1 */}
          <div className={style.wrapper}>
            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="nFazenda">
                Nome da Fazenda
              </label>
              <input
                id="nFazenda"
                className={style.input}
                type="text"
                autoComplete="off"
                placeholder="Digite aqui..."
                value={nomeFazenda}
                onChange={(e) => setNomeFazenda(e.target.value)}
              />
            </div>

            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="espPredominante">
                Espécie Predominante
              </label>
              <select 
              id="espPredominante" 
              className={style.select} 
              defaultValue=""
              value={especiePredominante}
              onChange={(e) => setEspeciePredominante(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Forasteiro">Forasteiro</option>
                <option value="Trinitário">Trinitário</option>
                <option value="Criollo">Criollo</option>
              </select>
            </div>
          </div>

          {/* Linha 2 */}
          <div className={style.wrapper}>
            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="cnpj">
                CNPJ
              </label>
              <input
                id="cnpj"
                className={style.input}
                type="text"
                placeholder="Digite aqui..."
                autoComplete="off"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>

            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="sisProdutivo">
                Sistema Produtivo
              </label>
              <select 
              id="sisProdutivo" 
              className={style.select} 
              defaultValue=""
              value={sistemaProdutivo}
              onChange={(e) => setSistemaProdutivo(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Pleno">Pleno</option>
                <option value="Cabruca">Cabruca</option>
                <option value="Agroflorestal">Agroflorestal</option>
              </select>
            </div>
          </div>

          {/* Linha 3 */}
          <div className={style.wrapper}>
            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="proprietario">
                Proprietário
              </label>
              <input
                id="proprietario"
                className={style.input}
                type="text"
                placeholder="Digite aqui..."
                autoComplete="off"
                value={proprietario}
                onChange={(e) => setProprietario(e.target.value)}
              />
            </div>

            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="divPlantio">
                Divisão do plantio
              </label>
              <select 
              id="divPlantio" 
              className={style.select} 
              defaultValue=""
              value={divisaoPlantio}
              onChange={(e) => setDivisaoPlantio(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Rua e Cova">Rua e Cova</option>
                <option value="Talhão">Talhão</option>
                <option value="Quadras">Quadras</option>
              </select>
            </div>
          </div>

          {/* Linha 4 */}
          <div className={style.wrapper}>
            <div className={style.field}>
              <label className={style.labelTitle} htmlFor="areaCultivo">
                Área de Cultivo
              </label>
              <input
                id="areaCultivo"
                className={style.input}
                type="text"
                placeholder="Digite aqui..."
                autoComplete="off"
                value={areaCultivo}
                onChange={(e) => setAreaCultivo(e.target.value)}
              />
            </div>

            <div className={style.field} /> {/* espaço vazio para manter a grade em 2 colunas */}
          </div>

          <div className={style.actions}>
            <button 
            type="button" 
            className={style.primaryBtn}
            disabled={!isFormValid}
            >
              Cadastrar
            </button>

            <button 
            onClick={() => navigate("/")}

            type="button" 
            className={style.primaryBtn}>
              Voltar
            </button>
          </div>
        </div>
      </Body>
    </>
  )
}
