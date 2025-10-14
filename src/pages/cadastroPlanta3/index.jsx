import React, { useState } from "react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Logo from "../../assets/Logo.png";
import Footer from "../../components/Footer";
import cacau from "../../public/cacau.png";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
);

export default function CadastroPlanta3() {
  // Situação
  const [situacao, setSituacao] = useState("doente");
  const [doenca, setDoenca] = useState("Vassoura de Bruxa");
  const [tratamento, setTratamento] = useState("");

  // Adubação
  const [adubo, setAdubo] = useState("Forth frutas");
  const [naoAdubado, setNaoAdubado] = useState(false);
  const [dataAdubacao, setDataAdubacao] = useState("DD/MM/AA");
  const [dataInspecao, setDataInspecao] = useState("DD/MM/AA");
  const [obs, setObs] = useState("");

  const navigate = useNavigate();

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
                    className={style.input}
                    placeholder="DD/MM/AA"
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
                    className={style.input}
                    placeholder="DD/MM/AA"
                    value={dataInspecao}
                    onChange={(e) => setDataInspecao(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Observações */}
            <section className={style.block}>
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
                onClick={() => navigate("/cadastro/planta/4")}
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
