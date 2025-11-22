import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { LockKeyhole, Mail, PencilLine, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFuncionarioContext } from "../../context/FuncionarioContext";
import { gerarCodigoAutoIncrement } from "../../utils/codigoAutoIncrement";

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
  const { funcionarioData, updateFuncionarioData, clearFuncionarioData } = useFuncionarioContext();
  const navigate = useNavigate();
  
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("")
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

  // Resetar dados ao montar o componente e gerar código imediatamente
  useEffect(() => {
    console.log('[CadastroUser1] Componente montado, resetando contexto e gerando novo código');
    clearFuncionarioData();
    
    // Gera código imediatamente
    const novoCodifo = gerarCodigoAutoIncrement('funcionario');
    console.log('[CadastroUser1] Código gerado:', novoCodifo);
    setCodigo(novoCodifo);
  }, []);

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updateFuncionarioData({
      codigo,
      nome,
      usuario,
      email,
      senha,
      confirmarSenha
    });
    console.log('[CadastroUser1] Salvando no contexto com código:', codigo);
  }, [codigo, nome, usuario, email, senha, confirmarSenha, updateFuncionarioData]);

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
          {/* Código do Funcionário */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="codigo">
              Código do Funcionário
            </label>
            <div className={style.inputWrapper}>
              <User className={style.icon} size={18} />
              <input className={style.input} 
              type="text" 
              id="codigo" 
              autoComplete="off"
              value={codigo}
              disabled
              placeholder="Código gerado automaticamente"
              />
            </div>
          </div>

          {/* Nome */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="nome">
              Nome Completo <span style={{ color: '#e74c3c' }}>*</span>
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
              Usuário <span style={{ color: '#e74c3c' }}>*</span>
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
              E-mail <span style={{ color: '#e74c3c' }}>*</span>
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
              Senha <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} 
              type={mostrarSenha ? "text" : "password"} 
              id="senha" 
              autoComplete="off"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className={style.eyeButton}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="conf_senha">
              Confirmar Senha <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <div className={style.inputWrapper}>
              <LockKeyhole className={style.icon} size={18} />
              <input className={style.input} 
              type={mostrarConfirmarSenha ? "text" : "password"} 
              id="conf_senha" 
              autoComplete="off"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              <button
                type="button"
                className={style.eyeButton}
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                title={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarConfirmarSenha ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Ações */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/funcionario/2")}
              className={style.buttonNext}
              type="button"
              disabled={!isFormValid}
              title="Campos com * são obrigatórios. Preencha todos para prosseguir."
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
