import React from "react";
import Logo from "../../assets/Logo.png";
import perfil from "../../assets/perfil.png";
import style from "./style.module.css";

const Header = () => {
  return (
    <div>
      <header className={style.headercontainer}>
        <div>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <div>
          <img src={perfil} alt="foto de perfil" />
        </div>
      </header>
    </div>
  );
};

export default Header;
