import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFuncionarios } from "../../hooks/useFuncionarios";

export default function RelatorioFuncionario() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getFuncionarioByCpf, getFuncionarioById, getFuncionarioByCodigo } = useFuncionarios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funcionario, setFuncionario] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  const codigo = location?.state?.codigo || ""; // pode ser código (FU-123456) ou CPF

  useEffect(() => {
    if (!codigo) {
      setError("Nenhum código foi fornecido");
      return;
    }

    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      setDebugInfo("");
      let debugLogs = [];
      
      try {
        let f = null;
        debugLogs.push(`Iniciando busca com código: "${codigo}"`);
        console.log(`[RelatorioFuncionario] Buscando com código: ${codigo}`);

        // Estratégia 1: Tenta por código gerado (ex: FU-123456)
        if (codigo.toUpperCase().startsWith('FU-')) {
          try {
            debugLogs.push(`Tentando buscar por código (FU-...)...`);
            console.log('[RelatorioFuncionario] Tentando buscar por código:', codigo);
            f = await getFuncionarioByCodigo(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrado por código: ${f.nome}`);
              console.log('[RelatorioFuncionario] Encontrado por código:', f);
            } else {
              debugLogs.push(`❌ Não encontrado por código`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por código: ${err.message}`);
            console.warn('[RelatorioFuncionario] Falha ao buscar por código:', err.message);
            f = null;
          }
        }

        // Estratégia 2: Tenta por CPF
        if (!f) {
          try {
            debugLogs.push(`Tentando buscar por CPF...`);
            console.log('[RelatorioFuncionario] Tentando buscar por CPF...');
            f = await getFuncionarioByCpf(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrado por CPF: ${f.nome}`);
              console.log('[RelatorioFuncionario] Encontrado por CPF:', f);
            } else {
              debugLogs.push(`❌ Não encontrado por CPF`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por CPF: ${err.message}`);
            console.warn('[RelatorioFuncionario] Falha ao buscar por CPF:', err.message);
            f = null;
          }
        }

        // Estratégia 3: Tenta por ID (numérico ou string)
        if (!f) {
          try {
            debugLogs.push(`Tentando buscar por ID...`);
            console.log('[RelatorioFuncionario] Tentando buscar por ID:', codigo);
            f = await getFuncionarioById(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrado por ID: ${f.nome}`);
              console.log('[RelatorioFuncionario] Encontrado por ID:', f);
            } else {
              debugLogs.push(`❌ Não encontrado por ID`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por ID: ${err.message}`);
            console.warn('[RelatorioFuncionario] Falha ao buscar por ID:', err.message);
            f = null;
          }
        }

        if (mounted) {
          if (f) {
            debugLogs.push(`✅ FUNCIONÁRIO ENCONTRADO!`);
            console.log('[RelatorioFuncionario] Dados finais:', f);
            setFuncionario(f);
          } else {
            debugLogs.push(`❌ FUNCIONÁRIO NÃO ENCONTRADO`);
            console.error('[RelatorioFuncionario] Funcionário não encontrado');
            setError("Funcionário não encontrado");
          }
          setDebugInfo(debugLogs.join('\n'));
        }
      } catch (err) {
        const msg = err.message || "Erro ao buscar funcionário";
        debugLogs.push(`❌ ERRO GERAL: ${msg}`);
        console.error('[RelatorioFuncionario] Erro geral:', err);
        if (mounted) {
          setError(msg);
          setDebugInfo(debugLogs.join('\n'));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, [codigo, getFuncionarioByCpf, getFuncionarioById]);

  const handleVoltar = () => {
    navigate("/relatorios");
  };

  const formatEndereco = (endereco = {}) => {
    const { rua, numero, bairro, cidade, uf } = endereco;
    return [rua, numero, bairro, cidade, uf].filter(Boolean).join(" - ");
  };

  return (
    <>
      <HeaderLogin />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Relatório: Funcionário</h1>

          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <>
              <div style={{ color: "#b00", marginBottom: 12 }}>⚠️ {error}</div>
              {debugInfo && (
                <details style={{ color: "#666", fontSize: "12px", marginBottom: 12 }}>
                  <summary>📋 Informações de Debug</summary>
                  <pre style={{ background: "#f5f5f5", padding: 10, borderRadius: 4, overflow: "auto" }}>
                    {debugInfo}
                  </pre>
                </details>
              )}
            </>
          ) : (
            <div className={style.formGrid}>
              <div className={style.field}>
                <label className={style.label}>Nome</label>
                <input type="text" className={style.input} value={funcionario?.nome || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Endereço</label>
                <input type="text" className={style.input} value={formatEndereco(funcionario?.endereco)} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Usuário</label>
                <input type="text" className={style.input} value={funcionario?.usuario || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>CPF</label>
                <input type="text" className={style.input} value={funcionario?.cpf || codigo} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>E-mail</label>
                <input type="email" className={style.input} value={funcionario?.email || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Celular</label>
                <input type="text" className={style.input} value={funcionario?.celular || ""} readOnly />
              </div>
            </div>
          )}

          <div className={style.actions}>
            <button className={style.voltarBtn} onClick={handleVoltar}>
              Voltar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
