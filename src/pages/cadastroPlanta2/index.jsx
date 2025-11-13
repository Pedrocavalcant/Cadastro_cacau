import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import formatarDecimal from "../../utils/maskDoisdigitos";
import { usePlantaContext } from "../../context/PlantaContext";

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
);

export default function CadastroPlanta2() {
  const navigate = useNavigate();
  const { plantaData, updatePlantaData } = usePlantaContext();

  const [lote, setLote] = useState(plantaData.lote || "");
  const [localizacao, setLocalizacao] = useState(plantaData.localizacao || "");
  const [tipoMuda, setTipoMuda] = useState(plantaData.tipo_muda || "");
  const [altura, setAltura] = useState(plantaData.altura_metros || "");
  const [diametroCopa, setDiametroCopa] = useState(plantaData.diametro_copa_metros || "");
  const [diametroTronco, setDiametroTronco] = useState(plantaData.diametro_tronco_metros || "");
  const [dataPlantio, setDataPlantio] = useState(plantaData.data_plantio || "");
  const [idadeArvore, setIdadeArvore] = useState(plantaData.idade_arvore || "");

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updatePlantaData({
      lote,
      localizacao,
      tipo_muda: tipoMuda,
      altura_metros: altura,
      diametro_copa_metros: diametroCopa,
      diametro_tronco_metros: diametroTronco,
      data_plantio: dataPlantio,
      idade_arvore: idadeArvore
    });
  }, [lote, localizacao, tipoMuda, altura, diametroCopa, diametroTronco, dataPlantio, idadeArvore]);

  const isLote = lote !== "";
  const isLocalizacao = localizacao !== "";
  const isTipoMuda = tipoMuda !== "";
  const isAltura = altura.trim().length > 0;
  const isDiametroCopa = diametroCopa.trim().length > 0;
  const isDiametroTronco = diametroTronco.trim().length > 0;
  const isDataPlantio = dataPlantio !== "";
  const isIdadeArvore = idadeArvore !== "";

  const isFormValid = isLote && isLocalizacao && isTipoMuda && isAltura && isDiametroCopa && isDiametroTronco && isDataPlantio && isIdadeArvore;

  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.card}>
          <h1 className={style.title}>Detalhes de Plantio</h1>

          <div className={style.grid}>
            {/* Tipo da muda */}
            <div className={style.field}>
              <label className={style.label} htmlFor="tipoMuda">
                Tipo da muda
              </label>
              <select
                id="tipoMuda"
                className={`${style.select} ${style.placeholder}`}
                value={tipoMuda}
                onChange={(e) => setTipoMuda(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Enxertia">Enxertia</option>
                <option value="Semente">Semente</option>
                <option value="Clonal">Clonal</option>
              </select>
            </div>

            {/* Altura */}
            <div className={style.field}>
              <label className={style.label} htmlFor="altura">
                Altura
              </label>
              <input
                id="altura"
                className={style.input}
                placeholder="Em metros"
                autoComplete="off"
                value={altura}
                onChange={(e) => setAltura(formatarDecimal(e.target.value))}
              />
            </div>

            {/* Diâmetro de Copa */}
            <div className={style.field}>
              <label className={style.label} htmlFor="diamCopa">
                Diâmetro de Copa
              </label>
              <input
                id="diamCopa"
                className={style.input}
                placeholder="Em metros"
                autoComplete="off"
                value={diametroCopa}
                onChange={(e) => setDiametroCopa(formatarDecimal(e.target.value))}
              />
            </div>

            {/* Diâmetro do tronco */}
            <div className={style.field}>
              <label className={style.label} htmlFor="diamTronco">
                Diâmetro do tronco
              </label>
              <input
                id="diamTronco"
                className={style.input}
                placeholder="Em metros"
                autoComplete="off"
                value={diametroTronco}
                onChange={(e) => setDiametroTronco(formatarDecimal(e.target.value))}
              />
            </div>

            {/* Data de plantio */}
            <div className={style.field}>
              <label className={style.label} htmlFor="dataPlantio">
                Data de plantio
              </label>
              <input
                type="date"
                id="dataPlantio"
                className={style.input}
                value={dataPlantio}
                onChange={(e) => setDataPlantio(e.target.value)}
              />
            </div>

            {/* Idade da árvore */}
            <div className={style.field}>
              <label className={style.label} htmlFor="idadeArvore">
                Idade da árvore
              </label>
              <input
                type="date"
                id="idadeArvore"
                className={style.input}
                value={idadeArvore}
                onChange={(e) => setIdadeArvore(e.target.value)}
                
              />
            </div>

            {/* Lote (com faixa verde) */}
            <div className={style.field}>
              <label className={style.label} htmlFor="lote">
                Lote
              </label>
              <div className={style.selectWrap}>
                <select
                  id="lote"
                  className={`${style.select} ${
                    !lote ? style.placeholder : ""
                  }`}
                  value={lote}
                  onChange={(e) => setLote(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="Lote A">Lote A</option>
                  <option value="Lote B">Lote B</option>
                  <option value="Lote C">Lote C</option>
                </select>
                {lote && <div className={style.selectFoot}>{lote}</div>}
              </div>
            </div>

            {/* Localização (com faixa verde) */}
            <div className={style.field}>
              <label className={style.label} htmlFor="localizacao">
                Localização
              </label>
              <div className={style.selectWrap}>
                <select
                  id="localizacao"
                  className={`${style.select} ${
                    !localizacao ? style.placeholder : ""
                  }`}
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="Rua A e Cova 3">Rua A e Cova 3</option>
                  <option value="Rua B e Cova 7">Rua B e Cova 7</option>
                  <option value="Talhão 02">Talhão 02</option>
                </select>
                {localizacao && (
                  <div className={style.selectFoot}>{localizacao}</div>
                )}
              </div>
            </div>
          </div>

          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/planta")}
              type="button"
              className={style.primaryBtn}
            >
              Voltar
            </button>
            <button
              onClick={() => navigate("/cadastro/planta/3")}
              type="button"
              className={style.primaryBtn}
              disabled={!isFormValid}
            >
              Avançar
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
}
