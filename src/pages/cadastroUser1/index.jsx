import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { LockKeyhole, Mail, PencilLine, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFuncionarioContext } from "../../context/FuncionarioContext";

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

export default function CadastroFuncionario() {
  const { funcionarioData, updateFuncionarioData } = useFuncionarioContext();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState(funcionarioData.nome || "")
  const [usuario, setUsuario] = useState(funcionarioData.usuario || "")
  const [email, setEmail] = useState(funcionarioData.email || "")
  const [senha, setSenha] = useState(funcionarioData.senha || "")
  const [confirmarSenha, setConfirmarSenha] = useState(funcionarioData.confirmarSenha || "")

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updateFuncionarioData({
      nome,
      usuario,
      email,
      senha,
      confirmarSenha
    });
  }, [nome, usuario, email, senha, confirmarSenha, updateFuncionarioData]);

  const isNome = nome.trim().length > 0
  const isUsuario = usuario.trim().length > 0
  const isEmail = email.trim().length > 0 && email.includes("@")
  const isSenha = senha.trim().length > 5 
  const isConfirmarSenha = confirmarSenha.trim().length > 5 && confirmarSenha === senha

  const isFormValid = isNome && isUsuario && isEmail && isSenha && isConfirmarSenha

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
              <input className={style.input} 
              type="text" 
              id="nome" 
              autoComplete="off"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          {/* Usuário */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="usuario">
              Usuário
            </label>
            <div className={style.inputWrapper}>
              <User className={style.icon} size={18} />
              <input className={style.input} 
              type="text" 
              id="usuario"
              autoComplete="off"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)} 
              />
            </div>
          </div>

          {/* E-mail */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="email">
              E-mail
            </label>
            <div className={style.inputWrapper}>
              <Mail className={style.icon} size={18} />
              <input className={style.input} 
              type="email" 
              id="email" 
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Senha */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="senha">
              Senha
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} 
              type="password" 
              id="senha" 
              autoComplete="off"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="conf_senha">
              Confirmar Senha
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} 
              type="password" 
              id="conf_senha" 
              autoComplete="off"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>

          {/* Ações */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/funcionario/2")}
              className={style.buttonNext}
              type="button"
              disabled={!isFormValid}
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
