import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const WelcomeLeft = () => {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <div>
        <h2 style={{ lineHeight: 1.1 }}>Bem-vindo</h2>
        <p style={{ opacity: 0.8 }}>
          Faça seu cadastro de forma fácil e rápida
        </p>
      </div>
    </>
  );
};

const CadastroFuncionario2 = () => {
  const [cpf, setCpf] = useState("")
  const [celular, setCelular] = useState("")
  const [rua, setRua] = useState("")
  const [numeroCasa, setNumeroCasa] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")

  const isCpf = cpf.trim().length === 11
  const isCelular = celular.trim().length >= 10
  const isRua = rua.trim().length > 0
  const isNumeroCasa = numeroCasa.trim().length > 0
  const isBairro = bairro.trim().length > 0
  const isCidade = cidade.trim().length > 0
  const isUf = uf.trim().length === 2

  const isFormValid = isCpf && isCelular && isRua && isNumeroCasa && isBairro && isCidade && isUf

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.containerInput}>
          {/* CPF */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="cpf">
              CPF
            </label>
            <input className={style.input} 
            type="text" 
            id="cpf" 
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {/* Celular */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="celular">
              Número de celular
            </label>
            <input className={style.input} 
            type="text" 
            id="celular" 
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            />
          </div>

          {/* Rua */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="rua">
              Rua
            </label>
            <input className={style.input} 
            type="text" 
            id="rua" 
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            />
          </div>

          {/* Nº da casa + Bairro */}
          <div className={style.row}>
            <div className={style.field} style={{ flex: 0.42 }}>
              <label className={style.labelTitle} htmlFor="numCasa">
                Nº da Casa
              </label>
              <input className={style.input} 
              type="text" 
              id="numCasa"
              value={numeroCasa}
              onChange={(e) => setNumeroCasa(e.target.value)}
              />
            </div>

            <div className={style.field} style={{ flex: 0.58 }}>
              <label className={style.labelTitle} htmlFor="bairro">
                Bairro
              </label>
              <input className={style.input} 
              type="text" 
              id="bairro" 
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              />
            </div>
          </div>

          {/* Cidade + UF */}
          <div className={style.row}>
            <div className={style.field} style={{ flex: 0.62 }}>
              <label className={style.labelTitle} htmlFor="cidade">
                Cidade
              </label>
              <input className={style.input} 
              type="text" 
              id="cidade" 
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div className={style.field} style={{ flex: 0.38 }}>
              <label className={style.labelTitle} htmlFor="uf">
                UF
              </label>
              <input className={style.input} 
              type="text" 
              id="uf" 
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              maxLength={2}
              />
            </div>
          </div>

          {/* Botão */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/funcionario")}
              className={style.primaryBtn}
              type="button"
            >
              Voltar
            </button>
            <button className={style.primaryBtn} 
            disabled={!isFormValid}
            type="button">
              Cadastrar
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CadastroFuncionario2;
