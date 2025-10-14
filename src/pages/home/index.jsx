import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import HeaderLogin from "../../components/headerLogin";
import Footer from "../../components/Footer";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={style.homeContainer}>
      <HeaderLogin />
      <div className={style.imagemHeader}>
        <p className={style.textHeader}>
          <span className={style.spanStrong}>Do solo fértil ao fruto perfeito:</span> <br />
          acompanhe cada etapa da sua plantação.
        </p>
      </div>
      <div className={style.containerdiv}>
        <h2>Gerencie seu negócio</h2>
        <section className={style.containerButton}>
          <div className={style.buttonPage}>
            <button
              className={style.buttonImage}
              type="button"
              onClick={() => navigate("/cadastro/cliente")}
            >
              Cadastro Cliente
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de planta
            </span>
          </div>

          <div className={style.buttonPage}>
            <button
              className={style.buttonImage}
              type="button"
              onClick={() => navigate("/cadastro/fazenda")}
            >
              Cadastro Fazenda
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de fazenda
            </span>
          </div>

          <div className={style.buttonPage}>
            <button
              className={style.buttonImage}
              type="button"
              onClick={() => navigate("/cadastro/planta")}
            >
              Cadastro Planta
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de clientes
            </span>
          </div>

        </section>  
      </div> 

      <div>
        <h2>Relatórios</h2>
        <div>
          <p><span className={style.spanStrong}>Do campo para a tela:</span> veja o que sua plantação tem a dizer</p>
          <button type="button">teste</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
