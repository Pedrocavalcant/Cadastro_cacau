import React from "react";
import HeaderLogin from "../../components/headerLogin";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const RelatorioFazenda = () => {
  const navigate = useNavigate();

  return (
    <div className={style.containerPrincipal}>
      <HeaderLogin />
      <div className={style.cardRelatorio}>
        <h2 className={style.titulo}>Relatório: Fazenda</h2>

        <div className={style.formGrid}>
          <div className={style.campo}>
            <label>Nome</label>
            <input type="text" />
          </div>

          <div className={style.campo}>
            <label>Área de produção</label>
            <input type="text" />
          </div>

          <div className={style.campo}>
            <label>Proprietário</label>
            <input type="text" />
          </div>

          <div className={style.campo}>
            <label>Tipo de divisão</label>
            <input type="text" />
          </div>

          <div className={style.campo}>
            <label>CNPJ</label>
            <input type="text" />
          </div>

          <div className={style.campo}>
            <label>Espécie Dominante</label>
            <input type="text" />
          </div>

          <div className={style.campoUnico}>
            <label>Sistema Produtivo</label>
            <input type="text" />
          </div>
        </div>

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
