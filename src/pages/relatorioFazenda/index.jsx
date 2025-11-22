import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFazendas } from "../../hooks/useFazendas";

const RelatorioFazenda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getFazendaById, getFazendaByCnpj, getFazendaByCodigo } = useFazendas();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fazenda, setFazenda] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  const codigo = location?.state?.codigo || ""; // pode ser código (FA-123456) ou CNPJ

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
        console.log(`[RelatorioFazenda] Buscando com código: ${codigo}`);

        // Estratégia 1: Tenta por código gerado (ex: FA-123456)
        if (codigo.toUpperCase().startsWith('FA-')) {
          try {
            debugLogs.push(`Tentando buscar por código (FA-...)...`);
            console.log('[RelatorioFazenda] Tentando buscar por código:', codigo);
            f = await getFazendaByCodigo(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrada por código: ${f.nome}`);
              console.log('[RelatorioFazenda] Encontrada por código:', f);
            } else {
              debugLogs.push(`❌ Não encontrada por código`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por código: ${err.message}`);
            console.warn('[RelatorioFazenda] Falha ao buscar por código:', err.message);
            f = null;
          }
        }

        // Estratégia 2: Tenta por CNPJ
        if (!f) {
          try {
            debugLogs.push(`Tentando buscar por CNPJ...`);
            console.log('[RelatorioFazenda] Tentando buscar por CNPJ...');
            f = await getFazendaByCnpj(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrada por CNPJ: ${f.nome}`);
              console.log('[RelatorioFazenda] Encontrada por CNPJ:', f);
            } else {
              debugLogs.push(`❌ Não encontrada por CNPJ`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por CNPJ: ${err.message}`);
            console.warn('[RelatorioFazenda] Falha ao buscar por CNPJ:', err.message);
            f = null;
          }
        }

        // Estratégia 3: Tenta por ID (numérico ou string)
        if (!f) {
          try {
            debugLogs.push(`Tentando buscar por ID...`);
            console.log('[RelatorioFazenda] Tentando buscar por ID:', codigo);
            f = await getFazendaById(codigo);
            if (f) {
              debugLogs.push(`✅ Encontrada por ID: ${f.nome}`);
              console.log('[RelatorioFazenda] Encontrada por ID:', f);
            } else {
              debugLogs.push(`❌ Não encontrada por ID`);
            }
          } catch (err) {
            debugLogs.push(`❌ Erro ao buscar por ID: ${err.message}`);
            console.warn('[RelatorioFazenda] Falha ao buscar por ID:', err.message);
            f = null;
          }
        }

        if (mounted) {
          if (f) {
            debugLogs.push(`✅ FAZENDA ENCONTRADA!`);
            console.log('[RelatorioFazenda] Dados finais:', f);
            setFazenda(f);
          } else {
            debugLogs.push(`❌ FAZENDA NÃO ENCONTRADA`);
            console.error('[RelatorioFazenda] Fazenda não encontrada');
            setError('Fazenda não encontrada');
          }
          setDebugInfo(debugLogs.join('\n'));
        }
      } catch (err) {
        const msg = err.message || 'Erro ao buscar fazenda';
        debugLogs.push(`❌ ERRO GERAL: ${msg}`);
        console.error('[RelatorioFazenda] Erro geral:', err);
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
  }, [codigo, getFazendaById, getFazendaByCnpj]);

  return (
    <div className={style.containerPrincipal}>
      <HeaderLogin />
      <div className={style.cardRelatorio}>
        <h2 className={style.titulo}>Relatório: Fazenda</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <>
            <div style={{ color: '#b00', marginBottom: 12 }}>⚠️ {error}</div>
            {debugInfo && (
              <details style={{ color: '#666', fontSize: '12px', marginBottom: 12 }}>
                <summary>📋 Informações de Debug</summary>
                <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4, overflow: 'auto' }}>
                  {debugInfo}
                </pre>
              </details>
            )}
          </>
        ) : (
          <div className={style.formGrid}>
            <div className={style.campo}>
              <label>Nome</label>
              <input type="text" value={fazenda?.nome || ''} readOnly />
            </div>

            <div className={style.campo}>
              <label>Área de produção</label>
              <input type="text" value={fazenda?.areaCultivo || ''} readOnly />
            </div>

            <div className={style.campo}>
              <label>Proprietário</label>
              <input type="text" value={fazenda?.proprietario || ''} readOnly />
            </div>

            <div className={style.campo}>
              <label>Tipo de divisão</label>
              <input type="text" value={fazenda?.divisaoPlantio || ''} readOnly />
            </div>

            <div className={style.campo}>
              <label>CNPJ</label>
              <input type="text" value={fazenda?.cnpj || codigo} readOnly />
            </div>

            <div className={style.campo}>
              <label>Espécie Dominante</label>
              <input type="text" value={fazenda?.especiePredominante || ''} readOnly />
            </div>

            <div className={style.campoUnico}>
              <label>Sistema Produtivo</label>
              <input type="text" value={fazenda?.sistemaProdutivo || ''} readOnly />
            </div>
          </div>
        )}

        <div className={style.containerBotao}>
          <button className={style.botaoVoltar} onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatorioFazenda;
