import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import Logo from "../../assets/Logo.png";
import Footer from "../../components/Footer";
import SuccessModal from "../../components/SuccessModal";
import cacau from "../../public/cacau.png";
import { Upload } from "lucide-react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import formatarDecimal from "../../utils/maskDoisdigitos";
import { usePlantaContext } from "../../context/PlantaContext";
import { usePlantas } from "../../hooks/usePlantas";

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
);

export default function CadastroPlanta4() {
  const navigate = useNavigate();
  const { plantaData, updatePlantaData } = usePlantaContext();
  const { createPlanta } = usePlantas();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRef = useRef(null);
  const [file, setFile] = useState(plantaData.qr_code || null);
  const [qtdColheita, setQtdColheita] = useState(plantaData.ultima_colheita_peso || '0,00');
  const [dtColheita, setDtColheita] = useState(plantaData.data_ultima_colheita || "");

  const isQtdColheita = qtdColheita !== '0,00' && qtdColheita !== "";
  const isDtColheita = dtColheita !== "";

  const isFormValid = isQtdColheita && isDtColheita;

  // Salvar dados no contexto sempre que houver mudanças
  useEffect(() => {
    updatePlantaData({
      qr_code: file,
      ultima_colheita_peso: qtdColheita,
      data_ultima_colheita: dtColheita
    });
  }, [file, qtdColheita, dtColheita]);

  function onPick() {
    inputRef.current?.click();
  }

  function onChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); // máx. 1
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Atualiza os dados finais no contexto
      const finalData = {
        ...plantaData,
        qr_code: file,
        ultima_colheita_peso: qtdColheita,
        data_ultima_colheita: dtColheita
      };
      
      console.log('Dados completos antes de salvar:', finalData);
      updatePlantaData(finalData);

      // Salva todos os dados no banco
      await createPlanta(finalData);
      
      setShowSuccess(true);
      setTimeout(() => navigate("/"), 3500);
    } catch (error) {
      console.error('Erro ao salvar planta:', error);
      alert('Erro ao salvar planta. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {showSuccess && (
        <SuccessModal 
          message="Planta cadastrada com sucesso!" 
          onClose={() => navigate("/")}
          autoCloseDuration={3000}
        />
      )}
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

          {/* Botões */}
          <div className={style.actions}>
            <button
              onClick={() => navigate("/cadastro/planta/3")}
              type="button"
              className={style.primaryBtn}
              disabled={loading}
            >
              Voltar
            </button>
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={style.primaryBtn}
            >
              {loading ? 'Salvando...' : 'Concluir Cadastro'}
            </button>
          </div>
        </div>
      </Body>
      <Footer />
    </>
  );
}
