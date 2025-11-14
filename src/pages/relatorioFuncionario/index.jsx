import React, { useEffect, useState } from "react";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";
import style from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFuncionarios } from "../../hooks/useFuncionarios";

export default function RelatorioFuncionario() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getFuncionarioByCpf, getFuncionarioById } = useFuncionarios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funcionario, setFuncionario] = useState(null);

  const codigo = location?.state?.codigo || ""; // espera-se CPF ou identificador

  useEffect(() => {
    if (!codigo) return;

    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let f = null;

        // Se o código for um número inteiro positivo, tentamos buscar por ID primeiro
        const codigoNumero = parseInt(String(codigo).replace(/\D/g, ''), 10);
        if (!Number.isNaN(codigoNumero) && String(codigoNumero) === String(codigo)) {
          try {
            f = await getFuncionarioById(codigoNumero);
          } catch (_) {
            f = null;
          }
        }

        // Se não encontrou por ID, tenta por CPF (útil quando o código é o CPF)
        if (!f) {
          try {
            f = await getFuncionarioByCpf(codigo);
          } catch (_) {
            f = null;
          }
        }

        if (mounted) {
          if (f) setFuncionario(f);
          else setError("Funcionário não encontrado");
        }
      } catch (err) {
        if (mounted) setError(err.message || "Erro ao buscar funcionário");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => { mounted = false; };
  }, [codigo, getFuncionarioByCpf]);

  const handleVoltar = () => {
    navigate("/relatorios");
  };

  const formatEndereco = (endereco = {}) => {
    const { rua, numero, bairro, cidade, uf } = endereco;
    return [rua, numero, bairro, cidade, uf].filter(Boolean).join(" - ");
  };

  return (
    <>
      <HeaderLogin />
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.title}>Relatório: Funcionário</h1>

          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <div style={{ color: "#b00", marginBottom: 12 }}>{error}</div>
          ) : (
            <div className={style.formGrid}>
              <div className={style.field}>
                <label className={style.label}>Nome</label>
                <input type="text" className={style.input} value={funcionario?.nome || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Endereço</label>
                <input type="text" className={style.input} value={formatEndereco(funcionario?.endereco)} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Usuário</label>
                <input type="text" className={style.input} value={funcionario?.usuario || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>CPF</label>
                <input type="text" className={style.input} value={funcionario?.cpf || codigo} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>E-mail</label>
                <input type="email" className={style.input} value={funcionario?.email || ""} readOnly />
              </div>

              <div className={style.field}>
                <label className={style.label}>Celular</label>
                <input type="text" className={style.input} value={funcionario?.celular || ""} readOnly />
              </div>
            </div>
          )}

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
