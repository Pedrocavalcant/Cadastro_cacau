import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFazendas } from "../../hooks/useFazendas";

const RelatorioFazenda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getFazendaById, getFazendaByCnpj } = useFazendas();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fazenda, setFazenda] = useState(null);

  const codigo = location?.state?.codigo || ""; // pode ser id ou cnpj

  useEffect(() => {
    if (!codigo) return;

    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let f = null;

        const codigoNumero = parseInt(String(codigo).replace(/\D/g, ''), 10);
        if (!Number.isNaN(codigoNumero) && String(codigoNumero) === String(codigo)) {
          try { f = await getFazendaById(codigoNumero); } catch (_) { f = null; }
        }

        if (!f) {
          try { f = await getFazendaByCnpj(codigo); } catch (_) { f = null; }
        }

        if (mounted) {
          if (f) setFazenda(f);
          else setError('Fazenda não encontrada');
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Erro ao buscar fazenda');
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
          <div style={{ color: '#b00', marginBottom: 12 }}>{error}</div>
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
