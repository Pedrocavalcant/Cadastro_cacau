import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { usePlantas } from "../../hooks/usePlantas";
import { formatPlantaForDisplay } from "../../utils/plantaHelpers.js";

export default function RelatorioPlanta() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getPlantaByCodigo } = usePlantas();
  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codigoPlanta = location.state?.codigo;
    if (codigoPlanta) {
      getPlantaByCodigo(codigoPlanta)
        .then(dadosPlanta => {
          // Padroniza o formato para exibição
          const formatted = formatPlantaForDisplay(dadosPlanta);
          setPlanta(formatted);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erro ao carregar dados da planta:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [getPlantaByCodigo, location.state]);

  const handleVoltar = () => {
    navigate("/relatorios");
  };

  return (
    <>
      <HeaderLogin />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Relatório: Planta</h1>

          <div className={style.formGrid}>
            {loading ? (
              <p>Carregando dados da planta...</p>
            ) : planta ? (
              <>
                <div className={style.field}>
                  <label className={style.label}>Código</label>
                  <input type="text" className={style.input} value={planta.codigo_individual || planta.identificacao?.codigo_individual || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Espécie</label>
                  <input type="text" className={style.input} value={planta.especie || planta.identificacao?.especie || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Tipo da muda</label>
                  <input type="text" className={style.input} value={planta.tipo_muda || planta.detalhes_plantio?.tipo_muda || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Lote</label>
                  <input type="text" className={style.input} value={planta.lote || planta.detalhes_plantio?.lote || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Localização</label>
                  <input type="text" className={style.input} value={planta.localizacao || planta.detalhes_plantio?.localizacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Data do plantio</label>
                  <input type="date" className={style.input} value={planta.data_plantio || planta.detalhes_plantio?.data_plantio || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Altura</label>
                  <input type="text" className={style.input} value={planta.altura_metros ?? planta.detalhes_plantio?.altura_metros ?? ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Diâmetro de copa</label>
                  <input type="text" className={style.input} value={planta.diametro_copa_metros ?? planta.detalhes_plantio?.diametro_copa_metros ?? ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Diâmetro de tronco</label>
                  <input type="text" className={style.input} value={planta.diametro_tronco_metros ?? planta.detalhes_plantio?.diametro_tronco_metros ?? ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Idade</label>
                  <input type="text" className={style.input} value={planta.idade_arvore || planta.detalhes_plantio?.idade_arvore || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Situação</label>
                  <input type="text" className={style.input} value={planta.situacao || planta.status?.situacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Adubo</label>
                  <input type="text" className={style.input} value={planta.adubo || planta.status?.adubo || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Última adubação</label>
                  <input type="date" className={style.input} value={planta.data_adubacao || planta.status?.data_adubacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Última inspeção</label>
                  <input type="date" className={style.input} value={planta.data_ultima_inspecao || planta.status?.data_ultima_inspecao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Produtividade</label>
                  <input type="text" className={style.input} value={planta.ultima_colheita_peso ?? planta.produtividade?.ultima_colheita_peso ?? ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Data da última colheita</label>
                  <input type="date" className={style.input} value={planta.data_ultima_colheita || planta.produtividade?.data_ultima_colheita || ''} readOnly />
                </div>
              </>
            ) : (
              <p>Nenhuma planta encontrada</p>
            )}
          </div>

          <div className={style.fieldFull}>
            <label className={style.label}>Observações</label>
            <textarea 
              className={style.textarea} 
              value={planta?.observacoes || planta?.status?.observacoes || ''} 
              readOnly
            ></textarea>
          </div>

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
