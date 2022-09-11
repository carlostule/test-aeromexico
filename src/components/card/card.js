import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFavoritesCharacters, removeFavoriteCharacters } from "../../redux/actions/characterActions";
import defaultUser from "../../assets/default_user.png";
import favIcon from "../../assets/fav_icon.png";
import favIconSelected from "../../assets/fav_icon_selected.png";
import "./Card.scss";

import { getWindowSize } from "../../utils/getWindowSize";

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
  hairColor = 'is bald',
}) => {
  const characters = useSelector((state) => state);
  const [width, setWidth] = useState(getWindowSize());
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();

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

  function pushFavoriteCharacter() {
    const character = {
      name,
      gender,
      house,
      dateOfBirth: birthday,
      eyeColour: eyesColor,
      hairColour: hairColor,
      hogwartsStudent,
      hogwartsStaff,
      alive,
      image: photo
    };

    if (!fav && characters.allCharacters.favorites.length < 5) {
      dispatch(setFavoritesCharacters(character));
    } else {
      dispatch(removeFavoriteCharacters(character));
    }
    
    setFav(current => !current);
  }

  function mobileCard() {
    return (
      <div className="card-container-mobile">
        <div className="photo-div-mobile" style={{ background: selectorColorHouse() }}>
          <img src={photo} className="photo" alt="Foto de perfil"/>
        </div>
        <div className="info-div-mobile" style={!alive ? { backgroundColor: '#CCCCCC' } : null}>
          <div className="info-col">
            <div className="name-row">
              <h2 className="name-text">{alive ? '' : '+'} {name}</h2>
            </div>
            <div className="info-row">
              <div className="info-col">
                <p className="alive-text">{alive ? 'VIVO' : 'FINADO'}</p>
                <p className="alive-text">{hogwartsStudent ? 'ESTUDIANTE' : 'STAFF'}</p>
              </div>
              <div className="fav-col" onClick={pushFavoriteCharacter}>
                <img src={fav && characters.allCharacters.favorites.filter((item) => item.name === name).length > 0 ? favIconSelected : favIcon} alt="Fav icon" className="fav-icon" />
              </div>
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
        <div className="info-div" style={!alive ? { backgroundColor: '#CCCCCC' } : null}>
          <div className="info-col">
            <div className="info-row-desktop">
              <div className="info-col-desktop">
                <p className="alive-text">{alive ? 'VIVO' : 'FINADO'}/{hogwartsStudent ? 'ESTUDIANTE' : 'STAFF'}</p>
              </div>
              <div className="fav-col" onClick={pushFavoriteCharacter}>
                <img src={fav && characters.allCharacters.favorites.filter((item) => item.name === name).length > 0 ? favIconSelected : favIcon} alt="Fav icon" className="fav-icon" />
              </div>
            </div>
            <div className="name-row-desktop">
              <h1 className="name-text">{alive ? '' : '+'}{name}</h1>
            </div>
            <div className="name-row-desktop">
              <p className="text-regular"><span className="text-bold">Cumpleaños:</span> {birthday}</p>
            </div>
            <div className="detail-row-desktop">
              <p className="text-regular"><span className="text-bold">Género:</span> {gender}</p>
            </div>
            <div className="detail-row-desktop">
              <p className="text-regular"><span className="text-bold">Color de ojos:</span> {eyesColor}</p>
            </div>
            <div className="detail-row-desktop">
              <p className="text-regular"><span className="text-bold">Color de pelo:</span> {hairColor}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return width >= 600 ? desktopCard() : mobileCard();
};

export default Card;
