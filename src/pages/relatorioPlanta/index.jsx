import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { usePlantas } from "../../hooks/usePlantas";

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
          setPlanta(dadosPlanta);
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
                  <input type="text" className={style.input} value={planta.codigo || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Altura</label>
                  <input type="text" className={style.input} value={planta.altura || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Lote</label>
                  <input type="text" className={style.input} value={planta.lote || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Espécie</label>
                  <input type="text" className={style.input} value={planta.especie || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Diâmetro de copa</label>
                  <input type="text" className={style.input} value={planta.diametroCopa || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Localização</label>
                  <input type="text" className={style.input} value={planta.localizacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Tipo da muda</label>
                  <input type="text" className={style.input} value={planta.tipoMuda || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Diâmetro de tronco</label>
                  <input type="text" className={style.input} value={planta.diametroTronco || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Situação</label>
                  <input type="text" className={style.input} value={planta.situacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Data do plantio</label>
                  <input type="date" className={style.input} value={planta.dataPlantio || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Idade</label>
                  <input type="text" className={style.input} value={planta.idade || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Adubo</label>
                  <input type="text" className={style.input} value={planta.adubo || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Última adubação</label>
                  <input type="date" className={style.input} value={planta.ultimaAdubacao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Última inspeção</label>
                  <input type="date" className={style.input} value={planta.ultimaInspecao || ''} readOnly />
                </div>

                <div className={style.field}>
                  <label className={style.label}>Produtividade</label>
                  <input type="text" className={style.input} value={planta.produtividade || ''} readOnly />
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
              value={planta?.observacoes || ''} 
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
