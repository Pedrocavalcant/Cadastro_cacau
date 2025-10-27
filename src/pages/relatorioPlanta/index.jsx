import React from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function RelatorioPlanta() {
  const navigate = useNavigate();

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
            <div className={style.field}>
              <label className={style.label}>Código</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Altura</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Lote</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Espécie</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Diâmetro de copa</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Localização</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Tipo da muda</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Diâmetro de tronco</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Situação</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Data do plantio</label>
              <input type="date" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Idade</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Adubo</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Última adubação</label>
              <input type="date" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Última inspeção</label>
              <input type="date" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Produtividade</label>
              <input type="text" className={style.input} />
            </div>
          </div>

          <div className={style.fieldFull}>
            <label className={style.label}>Observações</label>
            <textarea className={style.textarea}></textarea>
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
