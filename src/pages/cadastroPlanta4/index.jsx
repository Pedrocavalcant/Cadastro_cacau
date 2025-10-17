import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Logo from "../../assets/Logo.png";
import Footer from "../../components/Footer";
import cacau from "../../public/cacau.png";
import { Upload } from "lucide-react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import formatarDecimal from "../../utils/maskDoisdigitos";

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
);

export default function CadastroPlanta4() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [qtdColheita, setQtdColheita] = useState('0,00');
  const [dtColheita, setDtColheita] = useState("");

  const isQtdColheita = qtdColheita !== '0,00' && qtdColheita !== "";
  const isDtColheita = dtColheita !== ""

  const isFormValid = isQtdColheita && isDtColheita;



  function onPick() {
    inputRef.current?.click();
  }

  function onChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); // máx. 1
  }

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Body left={<WelcomeLeft />} bgImage={cacau}>
        <div className={style.card}>
          <h1 className={style.title}>Produtividade</h1>

          {/* Upload QR Code */}
          <section className={style.block}>
            <div className={style.uploadBar}>
              <span>
                <strong>Enviar Qr Code</strong>{" "}
                <small className={style.helper}>Limite máx. de 1 imagem</small>
              </span>

              <button
                type="button"
                className={style.iconBtn}
                onClick={onPick}
                aria-label="Enviar"
              >
                <Upload size={18} />
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onChange}
                style={{ display: "none" }}
              />
            </div>

            {file && <div className={style.filePill}>Imagem: {file.name}</div>}
          </section>

          {/* Última colheita (quantidade) */}
          <section className={style.block}>
            <label className={style.label} htmlFor="qtd">
              Última colheita
            </label>
            <input
              type="text"
              id="qtd"
              className={style.input}
              placeholder="Em quilos"
              autoComplete="off"
              value={qtdColheita}
              onChange={(e) => setQtdColheita(formatarDecimal(e.target.value))}
            />
          </section>

          {/* Data da última colheita */}
          <section className={style.block}>
            <label className={style.label} htmlFor="data">
              Última colheita
            </label>
            <input
              type="date"
              id="data"
              className={style.input}
              value={dtColheita}
              onChange={(e) => setDtColheita(e.target.value)}
            />
          </section>

          {/* Botão */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/planta/3")}
              type="button"
              className={style.primaryBtn}
            >
              Voltar
            </button>
            <button 
            type="button" 
            disabled={!isFormValid}
            className={style.primaryBtn}>
              Cadastro
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
}
