import React, { useState } from "react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Logo from "../../assets/Logo.png";
import Footer from "../../components/Footer";
import cacau from "../../public/cacau.png";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { usePlantaContext } from "../../context/PlantaContext";

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
);

export default function CadastroPlanta3() {
  const navigate = useNavigate();
  const { plantaData, updatePlantaData } = usePlantaContext();

  // Situação
  const [situacao, setSituacao] = useState(plantaData.situacao || "saudavel");
  const [doenca, setDoenca] = useState(plantaData.doenca || "");
  const [tratamento, setTratamento] = useState(plantaData.tratamento || "");

  // Adubação
  const [adubo, setAdubo] = useState(plantaData.adubo || "Forth frutas");
  const [naoAdubado, setNaoAdubado] = useState(plantaData.nao_foi_adubado || false);
  const [dataAdubacao, setDataAdubacao] = useState(plantaData.data_adubacao || "");
  const [dataInspecao, setDataInspecao] = useState(plantaData.data_ultima_inspecao || "");
  const [obs, setObs] = useState(plantaData.observacoes || "");

  const isAdubo = adubo !== "";
  const isDataAdubacao = dataAdubacao !== "" ;
  const isDataInspecao = dataInspecao !== "" ;
  const isNaoAdubado = !naoAdubado;


  const isFormValid = isAdubo && isDataInspecao && (isDataAdubacao || !isNaoAdubado);

  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.card}>
          <h1 className={style.title}>Status</h1>

          <div className={style.form}>
            {/* Situação */}
            <section className={style.block}>
              <div className={style.legend}>Situação</div>

              <div className={style.radios}>
                <label className={style.radio}>
                  <input
                    type="radio"
                    name="situacao"
                    value="doente"
                    checked={situacao === "doente"}
                    onChange={(e) => setSituacao(e.target.value)}
                  />
                  Doente
                </label>

                <label className={style.radio}>
                  <input
                    type="radio"
                    name="situacao"
                    value="em_tratamento"
                    checked={situacao === "em_tratamento"}
                    onChange={(e) => setSituacao(e.target.value)}
                  />
                  Em tratamento
                </label>

                <label className={style.radio}>
                  <input
                    type="radio"
                    name="situacao"
                    value="saudavel"
                    checked={situacao === "saudavel"}
                    onChange={(e) => setSituacao(e.target.value)}
                  />
                  Saudável
                </label>
              </div>

              {/* Selects condicionais */}
              {situacao === "doente" && (
                <div className={style.fieldNarrow}>
                  <select
                    className={`${style.select} ${
                      !doenca ? style.placeholder : ""
                    }`}
                    value={doenca}
                    onChange={(e) => setDoenca(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="Vassoura de Bruxa">Vassoura de Bruxa</option>
                    <option value="Podridão Parda">Podridão Parda</option>
                    <option value="Monilíase">Monilíase</option>
                  </select>
                  {doenca && <div className={style.foot}>{doenca}</div>}
                </div>
              )}

              {situacao === "em_tratamento" && (
                <div className={style.fieldNarrow}>
                  <select
                    className={`${style.select} ${
                      !tratamento ? style.placeholder : ""
                    }`}
                    value={tratamento}
                    onChange={(e) => setTratamento(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="Fungicida químico Ceplac">
                      Fungicida químico Ceplac
                    </option>
                    <option value="Controle biológico">
                      Controle biológico
                    </option>
                    <option value="Poda sanitária">Poda sanitária</option>
                  </select>
                  {tratamento && <div className={style.foot}>{tratamento}</div>}
                </div>
              )}
            </section>

            {/* Adubo */}
            <section className={style.block}>
              <div className={style.legend}>Adubo</div>
              <div className={style.fieldNarrow}>
                <select
                  className={`${style.select} ${
                    !adubo ? style.placeholder : ""
                  }`}
                  value={adubo}
                  onChange={(e) => setAdubo(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option value="Forth frutas">Forth frutas</option>
                  <option value="NPK 10-10-10">NPK 10-10-10</option>
                  <option value="Composto orgânico">Composto orgânico</option>
                </select>
                {adubo && <div className={style.foot}>{adubo}</div>}
              </div>
            </section>

            {/* Datas */}
            <section className={style.block}>
              <div className={style.twoCol}>
                <div className={style.field}>
                  <label className={style.label}>Data da adubação</label>
                  <input
                    type="date"
                    className={style.input}
                    value={dataAdubacao}
                    onChange={(e) => setDataAdubacao(e.target.value)}
                    disabled={naoAdubado}
                  />
                  <label className={style.check}>
                    <input
                      type="checkbox"
                      checked={naoAdubado}
                      onChange={(e) => {
                        setNaoAdubado(e.target.checked);
                        if (e.target.checked) setDataAdubacao("");
                      }}
                    />
                    Não foi adubado
                  </label>
                </div>

                <div className={style.field}>
                  <label className={style.label}>Data da última inspeção</label>
                  <input
                    type="date"
                    className={style.input}
                    value={dataInspecao}
                    onChange={(e) => setDataInspecao(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Observações */}
            <section className={style.block_obs}>
              <label className={style.legend}>Observações</label>
              <textarea
                className={style.textarea}
                rows={4}
                placeholder="Digite aqui..."
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </section>

            <div className={style.actions}>
              <button
                onClick={() => navigate("/cadastro/planta/2")}
                type="button"
                className={style.primaryBtn}
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  updatePlantaData({
                    situacao,
                    doenca: situacao === "doente" ? doenca : "",
                    tratamento: situacao === "em_tratamento" ? tratamento : "",
                    adubo,
                    data_adubacao: dataAdubacao,
                    data_ultima_inspecao: dataInspecao,
                    nao_foi_adubado: naoAdubado,
                    observacoes: obs
                  });
                  navigate("/cadastro/planta/4");
                }}
                disabled={!isFormValid}
                type="button"
                className={style.primaryBtn}
              >
                Avançar
              </button>
            </div>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
}
