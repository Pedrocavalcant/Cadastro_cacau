import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useFuncionarioContext } from "../../context/FuncionarioContext";
import { useFuncionarios } from "../../hooks/useFuncionarios.js";

const CadastroFuncionario2 = () => {
  const { funcionarioData, updateFuncionarioData, clearFuncionarioData } = useFuncionarioContext();
  const { createFuncionario, loading } = useFuncionarios();
  const navigate = useNavigate();
  
  const [cpf, setCpf] = useState(funcionarioData.cpf || "");
  const [celular, setCelular] = useState(funcionarioData.celular || "");
  const [rua, setRua] = useState(funcionarioData.endereco?.rua || "");
  const [numeroCasa, setNumeroCasa] = useState(funcionarioData.endereco?.numero || "");
  const [bairro, setBairro] = useState(funcionarioData.endereco?.bairro || "");
  const [cidade, setCidade] = useState(funcionarioData.endereco?.cidade || "");
  const [uf, setUf] = useState(funcionarioData.endereco?.uf || "");
  const [error, setError] = useState(null);

  // ===== Funções de máscara =====
  const formatCpf = (value) => {
    let v = value.replace(/\D/g, ""); // remove tudo que não é número
    v = v.slice(0, 11); // limita a 11 dígitos
    if (v.length > 9)
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    if (v.length > 6) return v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    if (v.length > 3) return v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    return v;
  };

  const formatCelular = (value) => {
    let v = value.replace(/\D/g, "");
    v = v.slice(0, 11); // limita a 11 dígitos
    if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    if (v.length > 2) return v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    return v;
  };

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

  // ===== Validações =====
  const isCpf = cpf.replace(/\D/g, "").length === 11;
  const isCelular = celular.replace(/\D/g, "").length >= 10;
  const isRua = rua.trim().length > 0;
  const isNumeroCasa = numeroCasa.trim().length > 0;
  const isBairro = bairro.trim().length > 0;
  const isCidade = cidade.trim().length > 0;
  const isUf = uf.trim().length === 2;

  const isFormValid =
    isCpf && isCelular && isRua && isNumeroCasa && isBairro && isCidade && isUf;

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updateFuncionarioData({
      cpf,
      celular,
      endereco: {
        rua,
        numero: numeroCasa,
        bairro,
        cidade,
        uf: uf.toUpperCase()
      }
    });
  }, [cpf, celular, rua, numeroCasa, bairro, cidade, uf, updateFuncionarioData]);

  const handleCadastrar = async () => {
    if (!isFormValid) return;
    
    setError(null);
    try {
      // Combinar dados das duas telas
      const funcionarioDataCompleto = {
        nome: funcionarioData.nome,
        usuario: funcionarioData.usuario,
        email: funcionarioData.email,
        senha: funcionarioData.senha,
        cpf: cpf.replace(/\D/g, ''),
        celular: celular.replace(/\D/g, ''),
        endereco: {
          rua: rua.trim(),
          numero: numeroCasa.trim(),
          bairro: bairro.trim(),
          cidade: cidade.trim(),
          uf: uf.toUpperCase().trim()
        },
        fazenda_id: funcionarioData.fazenda_id || null
      };
      
      await createFuncionario(funcionarioDataCompleto);
      alert('Funcionário cadastrado com sucesso!');
      
      // Limpar dados do contexto
      clearFuncionarioData();
      
      // Navegar para home ou página de sucesso
      navigate("/");
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar funcionário');
      console.error('Erro ao cadastrar funcionário:', err);
    }
  }

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
            <input
              className={style.input}
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              maxLength={14} // 000.000.000-00
            />
          </div>

          {/* Celular */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="celular">
              Número de celular
            </label>
            <input
              className={style.input}
              type="text"
              id="celular"
              value={celular}
              onChange={(e) => setCelular(formatCelular(e.target.value))}
              maxLength={15} // (00) 00000-0000
            />
          </div>

          {/* Rua */}
          <div className={style.field}>
            <label className={style.labelTitle} htmlFor="rua">
              Rua
            </label>
            <input
              className={style.input}
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
              <input
                className={style.input}
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
              <input
                className={style.input}
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
              <input
                className={style.input}
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
              <input
                className={style.input}
                type="text"
                id="uf"
                value={uf.toUpperCase()} // força letras maiúsculas
                onChange={(e) => setUf(e.target.value)}
                maxLength={2}
              />
            </div>
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '10px', padding: '10px', background: '#fee', borderRadius: '4px' }}>
              {error}
            </div>
          )}

          {/* Botões */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/funcionario")}
              className={style.primaryBtn}
              type="button"
            >
              Voltar
            </button>
            <button
              onClick={handleCadastrar}
              className={style.primaryBtn}
              disabled={!isFormValid || loading}
              type="button"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default CadastroFuncionario2;
