import React from "react";

import  Button from "../components/button/Button";
import "./HpLandingPage.scss";

import hpLogo from "../assets/hp_logo.png";

function HpLandingPage() {
  return (
    <div className="container-page">
      <div className="header-page">
        <div className="logo-container">
          <img src={hpLogo} alt="Logo de Harry Potter" className="hp-logo"/>
        </div>
        <p className="filter-text">Selecciona tu filtro</p>
      </div>
      <div className="body-page">
        <div className="button-container">
          <Button filterName="Estudiantes"/>
          <Button filterName="Staff"/>
        </div>
        <div className="cards-container">

        </div>
      </div>
      <div className="footer-page">

      </div>
    </div>
  );
}

export default HpLandingPage;
