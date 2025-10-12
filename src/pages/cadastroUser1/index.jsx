import React from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { LockKeyhole, Mail, PencilLine, User } from "lucide-react";
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

export default function CadastroCliente() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.containerInput}>
          {/* Nome */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="nome">
              Nome Completo
            </label>
            <div className={style.inputWrapper}>
              <PencilLine className={style.icon} size={18} />
              <input className={style.input} type="text" id="nome" />
            </div>
          </div>

          {/* Usuário */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="usuario">
              Usuário
            </label>
            <div className={style.inputWrapper}>
              <User className={style.icon} size={18} />
              <input className={style.input} type="text" id="usuario" />
            </div>
          </div>

          {/* E-mail */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="email">
              E-mail
            </label>
            <div className={style.inputWrapper}>
              <Mail className={style.icon} size={18} />
              <input className={style.input} type="email" id="email" />
            </div>
          </div>

          {/* Senha */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="senha">
              Senha
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} type="password" id="senha" />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="conf_senha">
              Confirmar Senha
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} type="password" id="conf_senha" />
            </div>
          </div>

          {/* Ações */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/cliente/2")}
              className={style.buttonNext}
              type="button"
            >
              Proximo
            </button>

            <button
              onClick={() => navigate("/")}
              className={style.buttonNext}
              type="button"
            >
              Voltar
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
}
