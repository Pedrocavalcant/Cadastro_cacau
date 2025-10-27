import React from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function RelatorioFuncionario() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/relatorios");
  };

  return (
    <>
      <HeaderLogin />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Relatório: Funcionário</h1>

          <div className={style.formGrid}>
            <div className={style.field}>
              <label className={style.label}>Nome</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Endereço</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Usuário</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>CPF</label>
              <input type="text" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>E-mail</label>
              <input type="email" className={style.input} />
            </div>

            <div className={style.field}>
              <label className={style.label}>Celular</label>
              <input type="text" className={style.input} />
            </div>
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
