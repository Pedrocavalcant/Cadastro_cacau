import React, { useRef, useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import { Upload, QrCode } from "lucide-react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { usePlantaContext } from "../../context/PlantaContext";

const WelcomeLeft = () => {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <div>
        <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
      </div>
    </>
  );
};

export default function CadastroPlanta() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { plantaData, updatePlantaData } = usePlantaContext();
  const [files, setFiles] = useState(plantaData.imagens || []);
  const [especie, setEspecie] = useState(plantaData.especie || "");
  const [codigo, setCodigo] = useState(plantaData.codigo_individual || "");

  const isEspecie = especie !== "";
  const isCodigo = codigo !== "";

  const isFormValid = isEspecie && isCodigo;

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updatePlantaData({
      imagens: files,
      especie,
      codigo_individual: codigo
    });
  }, [files, especie, codigo]);

  function onPick() {
    inputRef.current?.click();
  }

  function onChange(e) {
    const arr = Array.from(e.target.files || []);
    const next = [...files, ...arr].slice(0, 3); // máximo de 3 imagens
    setFiles(next);
  }

  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.card}>
          <h1 className={style.title}>Identificação</h1>

          {/* Enviar imagens */}
          <section className={style.block}>
            <div className={style.uploadBar}>
              <span>
                <strong>Enviar imagens</strong>{" "}
                <small className={style.helper}>Limite máx. de 3 imagens</small>
              </span>

              <button type="button" className={style.iconBtn} onClick={onPick}>
                <Upload size={18} />
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
                style={{ display: "none" }}
              />
            </div>

            {files.length > 0 && (
              <ul className={style.fileList}>
                {files.map((f, i) => (
                  <li key={i}>Imagem: {f.name}</li>
                ))}
              </ul>
            )}
          </section>

          {/* Código Individual */}
          <section className={style.block}>
            <label className={style.label} htmlFor="codigo">Código Individual</label>
            <input
              id="codigo"
              className={style.input}
              type="text"
              placeholder="Digite o código da planta"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
          </section>

          {/* Espécie */}
          <section className={style.block}>
            <label className={style.label} htmlFor="especie">
              Espécie
            </label>
            <div className={style.selectWrap}>
              <select
                id="especie"
                className={`${style.select} ${
                  !especie ? style.isPlaceholder : ""
                }`}
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Forasteiro">Forasteiro</option>
                <option value="Trinitário">Trinitário</option>
                <option value="Criollo">Criollo</option>
              </select>

              {especie && <div className={style.selectFoot}>{especie}</div>}
            </div>
          </section>

          {/* Botão */}
          <div className={style.actions}>
            <button
              onClick={() => {
                updatePlantaData({
                  imagens: files,
                  especie,
                  codigo_individual: codigo
                });
                navigate("/cadastro/planta/2");
              }}
              type="button"
              className={style.primaryBtn}
              disabled={!isFormValid}
            >
              Avançar
            </button>

            <button
              onClick={() => navigate("/")}
              type="button"
              className={style.primaryBtn}
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
