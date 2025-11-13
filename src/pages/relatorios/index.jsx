import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import style from "./style.module.css";

const LeftPanel = () => (
  <>
    <img src={Logo} alt="Logo" className={style.logo} />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Relatórios</h2>
    </div>
  </>
);

export default function Relatorios() {
  const navigate = useNavigate();
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [codigo, setCodigo] = useState("");

  const isTiporelatorio = tipoRelatorio !== "";
  const isCodigo = codigo.trim().length > 0;
  const isFormValid = isTiporelatorio && isCodigo;

  const handlePlaceholder = () => {
    switch (tipoRelatorio) {
      case "Planta":
        return "Apenas números";
      case "Fazenda":
        return "Código da fazenda";
      case "Funcionário":
        return "Código do funcionário";
      default:
        return "Selecione o tipo de relatório";
    }
  };

  const handleBuscar = () => {
    if (tipoRelatorio === "Funcionário") {
      navigate("/relatorio/funcionario", { state: { codigo } });
    } else if (tipoRelatorio === "Planta") {
      navigate("/relatorio/planta", { state: { codigo } });
    } else if (tipoRelatorio === "Fazenda") {
      navigate("/relatorio/fazenda", { state: { codigo } });
    }
  };

  return (
    <>
      <Header />
      <Body left={<LeftPanel />} bgImage={cacau}>
        <div className={style.card}>
          <h1 className={style.title}>Relatórios</h1>

          <div className={style.field}>
            <label className={style.label} htmlFor="tipoRelatorio">
              Selecione o relatório que deseja consultar
            </label>
            <select
              id="tipoRelatorio"
              className={`${style.select} ${
                !tipoRelatorio ? style.placeholder : ""
              }`}
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Planta">Planta</option>
              <option value="Fazenda">Fazenda</option>
              <option value="Funcionário">Funcionário</option>
            </select>
          </div>

          <div className={style.field}>
            <label className={style.label} htmlFor="codigo">
              {tipoRelatorio === "Planta"
                ? "Código da planta"
                : tipoRelatorio === "Fazenda"
                ? "Código da fazenda"
                : tipoRelatorio === "Funcionário"
                ? "Código do funcionário"
                : "Código"}
            </label>
            <input
              id="codigo"
              className={style.input}
              placeholder={handlePlaceholder()}
              disabled={!isTiporelatorio}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </div>

          <div className={style.actions}>
            <button
              type="button"
              className={style.primaryBtn}
              disabled={!isFormValid}
              onClick={handleBuscar}
            >
              Buscar
            </button>
            <button
              type="button"
              className={style.primaryBtn}
              onClick={() => navigate('/')}
              style={{ marginLeft: 8 }}
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
