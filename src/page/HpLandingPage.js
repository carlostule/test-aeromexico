/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";

import Button from "../components/button/Button";
import Card from "../components/card/Card";
import "./HpLandingPage.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import hpLogo from "../assets/hp_logo.png";
import addCharacter from "../assets/add_character.png";
import favIcon from "../assets/fav_icon_white.png";
import deleteIcon from "../assets/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters, removeFavoriteCharacters } from "../redux/actions/characterActions";

function HpLandingPage() {
  const characters = useSelector((state) => state);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();

  const fetchCharacters = async () => {
    const response = await axios.get("https://hp-server-app.herokuapp.com/posts").catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(setCharacters(response.data));
  };

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

  function deleteFavoriteCharacter(item) {
    const character = characters.allCharacters?.favorites?.filter((char) => char.name === item.name);
    dispatch(removeFavoriteCharacters(character[0]));
  }

  function showModal() {
    // setModal(true);
  }

  console.log(characters.allCharacters.favorites);

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
            <DropdownButton
              drop="up"
              title={<span>FAVORITOS <img src={favIcon} alt="FavIcon" className="fav-icon-white"/></span>}
              variant="link"
              style={{ backgroundColor: "transparent", textDecoration: "none" }}
            >
              {characters.allCharacters?.favorites.length > 0 ? characters.allCharacters?.favorites?.map((item) => (
                <Dropdown.Item>{item.name}<img src={deleteIcon} alt="Borrar" className="delete-icon" onClick={() => deleteFavoriteCharacter(item)}/></Dropdown.Item>
              )) : (<Dropdown.Item>No hay personajes favoritos</Dropdown.Item>)}
            </DropdownButton>
          </div>
          <div className="add">
           <p className="add-text">AGREGAR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HpLandingPage;
