import React, { useRef, useState } from "react"
import Header from "../../components/Header"
import Body from "../../components/Body"
import Logo from "../../assets/Logo.png"
import cacau from "../../public/cacau.png"
import { Upload } from "lucide-react"
import style from "./style.module.css"

const WelcomeLeft = () => (
  <>
    <img src={Logo} alt="Logo" />
    <div>
      <h2 style={{ lineHeight: 1.1 }}>Cadastro da Planta</h2>
    </div>
  </>
)

export default function CadastroPlanta4() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [qtdColheita, setQtdColheita] = useState("")
  const [dtColheita, setDtColheita] = useState("")

  function onPick() {
    inputRef.current?.click()
  }

  function onChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f) // máx. 1
  }

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

              <button type="button" className={style.iconBtn} onClick={onPick} aria-label="Enviar">
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

            {file && (
              <div className={style.filePill}>
                Imagem: {file.name}
              </div>
            )}
          </section>

          {/* Última colheita (quantidade) */}
          <section className={style.block}>
            <label className={style.label} htmlFor="qtd">Última colheita</label>
            <input
              id="qtd"
              className={style.input}
              placeholder="Em quilos"
              value={qtdColheita}
              onChange={(e) => setQtdColheita(e.target.value)}
            />
          </section>

          {/* Data da última colheita */}
          <section className={style.block}>
            <label className={style.label} htmlFor="data">Última colheita</label>
            <input
              id="data"
              className={style.input}
              placeholder="DD/MM/AA"
              value={dtColheita}
              onChange={(e) => setDtColheita(e.target.value)}
            />
          </section>

          {/* Botão */}
          <div className={style.actions}>
            <button type="button" className={style.primaryBtn}>Concluir</button>
          </div>
        </div>
      </Body>
    </>
  )
}
