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
      <div className={style.containerBody}>
        <h2 className={style.titleBody}>Gerencie seu negócio</h2>
        <section className={style.containerButton}>
          <div className={style.buttonPage}>
            <button
              className={style.buttonImage1}
              type="button"
              onClick={() => navigate("/cadastro/funcionario")}
            >
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de planta
            </span>
          </div>

          <div className={style.buttonPage}>
            <button
              className={style.buttonImage2}
              type="button"
              onClick={() => navigate("/cadastro/fazenda")}
            >
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de fazenda
            </span>
          </div>

          <div className={style.buttonPage}>
            <button
              className={style.buttonImage3}
              type="button"
              onClick={() => navigate("/cadastro/planta")}
            >
            </button>
            <span className={style.spanStrong}>
              Cadastro e atualização de funcionarios
            </span>
          </div>

        </section>  
      </div> 

      <div className={style.containerFooter}>
        <h2 className={style.titleFooter}>Relatórios</h2>
        <div className={style.imagemFooter}>
          <p className={style.textFooter}><span className={style.spanStrong}>Do campo para a tela:</span> veja o que sua plantação tem a dizer</p>
          {/* <button className={style.footerBotton} type="button"></button> */}
        </div>
      </div>

    </div>
  );
};

export default Home;
