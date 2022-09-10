/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/button/Button";
import Card from "../components/card/Card";
import "./HpLandingPage.scss";

import hpLogo from "../assets/hp_logo.png";
import addCharacter from "../assets/add_character.png";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../redux/actions/characterActions";

function HpLandingPage() {
  const characters = useSelector((state) => state);
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const fetchCharacters = async () => {
    const response = await axios.get("https://hp-server-app.herokuapp.com/posts").catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(setCharacters(response.data));
  };
  console.log(characters);
  useEffect(() => {
    fetchCharacters();
  }, [result]);

  function filtering(filter) {
    if (characters.allCharacters?.characters.length > 0) {
      switch (filter) {
        case 'staff':
          setResult(characters.allCharacters?.characters.filter((character) => character.hogwartsStaff));
          break;
        default:
          setResult(characters.allCharacters?.characters.filter((character) => character.hogwartsStudent));
          break;
      } 
    } else {
      console.log("No hay personajes que filtrar");
      setResult([]);
    }
  }

  function clearFilters() {
    setResult([]);
  }

  function showModal() {
    setModal(true);
  }

  return (
    <div className="container-page">
      <div className="header-page">
        <div className="logo-container">
          <img src={hpLogo} alt="Logo de Harry Potter" className="hp-logo" onClick={clearFilters}/>
        </div>
        <p className="filter-text">Selecciona tu filtro</p>
      </div>
      <div className="body-page">
        <div className="button-container">
          <Button filterName="Estudiantes" applyFilter={() => filtering('students')}/>
          <Button filterName="Staff" applyFilter={() => filtering('staff')}/>
        </div>
        {result.length > 0 ? (<div className="cards-container">
          {result.length > 0 && result.map((character) => (
            <Card
              photo={character.image}
              name={character.name}
              house={character.house}
              hogwartsStudent={character.hogwartsStudent}
              hogwartsStaff={character.hogwartsStaff}
              alive={character.alive}
              birthday={character.dateOfBirth}
              gender={character.gender}
              eyesColor={character.eyeColour}
              hairColor={character.hairColour}
            />
          ))}
        </div>) : (<div className="cards-container">
          {characters.allCharacters?.characters.length > 0 && characters.allCharacters?.characters.map((character) => (
            <Card
              photo={character.image}
              name={character.name}
              house={character.house}
              hogwartsStudent={character.hogwartsStudent}
              hogwartsStaff={character.hogwartsStaff}
              alive={character.alive}
              birthday={character.dateOfBirth}
              gender={character.gender}
              eyesColor={character.eyeColour}
              hairColor={character.hairColour}
            />
          ))}
        </div>)}
        <div className="fixed-bar">
          <div className="favorites">
            <p className="add-text">FAVORITOS</p>
          </div>
          <div className="add" onClick={showModal}>
           <p className="add-text">AGREGAR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HpLandingPage;
