import React from "react";
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

const CadastroCliente2 = () => {
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
            <input className={style.input} type="text" id="cpf" />
          </div>

          {/* Celular */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="celular">
              Número de celular
            </label>
            <input className={style.input} type="text" id="celular" />
          </div>

          {/* Rua */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="rua">
              Rua
            </label>
            <input className={style.input} type="text" id="rua" />
          </div>

          {/* Nº da casa + Bairro */}
          <div className={style.row}>
            <div className={style.field} style={{ flex: 0.42 }}>
              <label className={style.labelTitle} htmlFor="numCasa">
                Nº da Casa
              </label>
              <input className={style.input} type="text" id="numCasa" />
            </div>
            <div className={style.field} style={{ flex: 0.58 }}>
              <label className={style.labelTitle} htmlFor="bairro">
                Bairro
              </label>
              <input className={style.input} type="text" id="bairro" />
            </div>
          </div>

          {/* Cidade + UF */}
          <div className={style.row}>
            <div className={style.field} style={{ flex: 0.62 }}>
              <label className={style.labelTitle} htmlFor="cidade">
                Cidade
              </label>
              <input className={style.input} type="text" id="cidade" />
            </div>
            <div className={style.field} style={{ flex: 0.38 }}>
              <label className={style.labelTitle} htmlFor="uf">
                UF
              </label>
              <input className={style.input} type="text" id="uf" />
            </div>
          </div>

          {/* Botão */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/cliente")}
              className={style.primaryBtn}
              type="button"
            >
              Voltar
            </button>
            <button className={style.primaryBtn} type="button">
              Cadastrar
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CadastroCliente2;
