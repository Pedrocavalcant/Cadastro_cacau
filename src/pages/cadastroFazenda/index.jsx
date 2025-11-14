import React, { useState } from "react"
import Logo from "../../assets/Logo.png"
import cacau from "../../public/cacau.png"
import Header from "../../components/Header"
import Body from "../../components/Body"
import SuccessModal from "../../components/SuccessModal"
import style from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { useFazendas } from "../../hooks/useFazendas.js"

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
  const { createFazenda, loading } = useFazendas()
  const navigate = useNavigate()
  
  const [nomeFazenda, setNomeFazenda] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [proprietario, setProprietario] = useState("")
  const [areaCultivo, setAreaCultivo] = useState("")
  const [especiePredominante, setEspeciePredominante] = useState("")
  const [sistemaProdutivo, setSistemaProdutivo] = useState("")
  const [divisaoPlantio, setDivisaoPlantio] = useState("")
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const isNomeFazenda = nomeFazenda.trim().length > 0
  const isCnpj = cnpj.trim().length > 13
  const isProprietario = proprietario.trim().length > 0
  const isAreaCultivo = areaCultivo.trim().length > 0
  const isEspeciePredominante = especiePredominante !== ""
  const isSistemaProdutivo = sistemaProdutivo !== ""
  const isDivisaoPlantio = divisaoPlantio !== ""

  const isFormValid = isNomeFazenda && isCnpj && isProprietario && isAreaCultivo && isEspeciePredominante && isSistemaProdutivo && isDivisaoPlantio

  const formatCnpj = (value) => {
    let v = value.replace(/\D/g, "");
    v = v.slice(0, 14);
    if (v.length > 12) return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5")
    if (v.length > 8) return v.replace(/(\d)(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3/$4")
    if (v.length > 5) return v.replace(/(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
    if (v.length > 2) return v.replace(/(\d{2})(\d{0,2})/, "$1.$2");
    return v;
  }

  const handleCadastrar = async () => {
    if (!isFormValid) return;
    
    setError(null);
    try {
      const fazendaData = {
        nome: nomeFazenda.trim(),
        cnpj: cnpj.replace(/\D/g, ''),
        proprietario: proprietario.trim(),
        areaCultivo: areaCultivo.trim(),
        especiePredominante,
        sistemaProdutivo,
        divisaoPlantio
      };
      
      await createFazenda(fazendaData);
      setShowSuccess(true);
      
      // Limpar formulário
      setNomeFazenda("");
      setCnpj("");
      setProprietario("");
      setAreaCultivo("");
      setEspeciePredominante("");
      setSistemaProdutivo("");
      setDivisaoPlantio("");
      
      // Navegar após 3.5 segundos
      setTimeout(() => navigate("/"), 3500);
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar fazenda');
      console.error('Erro ao cadastrar fazenda:', err);
    }
  }
  return (
    <>
      <Header />
      {showSuccess && (
        <SuccessModal 
          message="Fazenda cadastrada com sucesso!" 
          onClose={() => navigate("/")}
          autoCloseDuration={3000}
        />
      )}
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
                onChange={(e) => setCnpj(formatCnpj(e.target.value))}
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

          {error && (
            <div style={{ color: 'red', marginBottom: '10px', padding: '10px', background: '#fee', borderRadius: '4px' }}>
              {error}
            </div>
          )}

          <div className={style.actions}>
            <button 
            type="button" 
            className={style.primaryBtn}
            disabled={!isFormValid || loading}
            onClick={handleCadastrar}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
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
