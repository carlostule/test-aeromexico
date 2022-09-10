import React, { useEffect, useState } from "react";

import defaultUser from "../../assets/default_user.png";
import "./Card.scss";

const Card = ({
  photo = defaultUser,
  name = 'no name',
  house = 'no house',
  hogwartsStudent = false,
  hogwartsStaff = false,
  alive = false,
  birthday = 'no birthday',
  gender = 'no gender',
  eyesColor = 'is blind',
  hairColor = 'is bald'
}) => {
  const [width, setWidth] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWidth(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function selectorColorHouse() {
    switch (house) {
      case "Gryffindor":
        return "linear-gradient(358.61deg, #FF0000 4.67%, #FED482 96.97%)";
      case "Slytherin":
        return "linear-gradient(135deg, #1C792B 0%, #82E95E 100%)";
      case "Hufflepuff":
        return "linear-gradient(135deg, #FFC700 0%, #FFF388 100%)";
      case "Ravenclaw":
        return "linear-gradient(135deg, #0597B7 0%, #66D1FF 100%)";
      default:
        return "#6B63B5";
    }
  }

  function mobileCard() {
    return (
      <div className="card-container-mobile">
        <div className="photo-div" style={{ background: selectorColorHouse() }}>
          <img src={photo} className="photo" alt="Foto de perfil"/>
        </div>
        <div className="info-div">
          <div className="info-col">
            <div className="name-row">
              <h2 className="name-text">{name}</h2>
            </div>
            <div className="info-row">

            </div>
          </div>
        </div>
      </div>
    );
  }

  function desktopCard() {
    return (
      <div className="card-container">
        <div className="photo-div" style={{ background: selectorColorHouse() }}>
          <img src={photo} className="photo" alt="Foto de perfil"/>
        </div>
        <div className="info-div">
          <p>Como estas?</p>
        </div>
      </div>
    );
  }

  return width >= 600 ? desktopCard() : mobileCard();
};

function getWindowSize() {
  const { innerWidth } = window;
  return innerWidth;
}

export default Card;
