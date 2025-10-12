import React, { useRef, useState } from "react";
import Logo from "../../assets/Logo.png";
import cacau from "../../public/cacau.png";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import { Upload, QrCode } from "lucide-react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

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
  const [files, setFiles] = useState([]);
  const [especie, setEspecie] = useState(""); // controla o select

  const navigate = useNavigate();

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
          <section className={style.qrSection}>
            <label className={style.label}>Código Individual</label>
            <div className={style.qrContainer}>
              <div className={style.qrBox}>
                <QrCode size={92} />
              </div>
            </div>
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
              onClick={() => navigate("/cadastro/planta/2")}
              type="button"
              className={style.primaryBtn}
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
