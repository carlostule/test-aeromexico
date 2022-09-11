/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DropdownButton, Dropdown, Button as Btn, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Button from "../components/button/Button";
import Card from "../components/card/Card";
import "./HpLandingPage.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import hpLogo from "../assets/hp_logo.png";
import addCharacterIcon from "../assets/add_character.png";
import favIcon from "../assets/fav_icon_white.png";
import deleteIcon from "../assets/delete.png";
import bg from "../assets/background.png";
import defaultUser from "../assets/default_user.png";
import { useDispatch, useSelector } from "react-redux";
import { setCharacters, removeFavoriteCharacters } from "../redux/actions/characterActions";
import { getWindowSize } from "../utils/getWindowSize";

function HpLandingPage() {
  const characters = useSelector((state) => state);
  const [width, setWidth] = useState(getWindowSize());
  const [result, setResult] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [newName, setNewName] = useState('');
  const [newBirth, setNewBirth] = useState('');
  const [newEyeColor, setNewEyeColor] = useState('');
  const [newHairColor, setNewHairColor] = useState('');
  const [newGenderM, setNewGenderM] = useState(false);
  const [newGenderH, setNewGenderH] = useState(false);
  const [newPositionE, setNewPositionE] = useState(false);
  const [newPositionS, setNewPositionS] = useState(false);
  const [newPhoto, setNewPhoto] = useState('');
  const dispatch = useDispatch();

  const fetchCharacters = async () => {
    const response = await axios.get("https://hp-server-app.herokuapp.com/posts").catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(setCharacters(response.data));
  };

  const postNewCharacter = async (item) => {
    axios.post("https://hp-server-app.herokuapp.com/posts", item).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    function handleWindowResize() {
      setWidth(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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
    setHideModal(current => !current);
  }

  function sortingHat() {
    const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Hufflepuff"];

    return houses[Math.floor(Math.random() * 4)];
  }

  function addNewCharacter() {
    const newCharacter = {
      id: `${Math.floor(Math.random())}-NEW`,
      name: newName,
      species: "human",
      gender: newGenderM ? "female" : "male",
      house: sortingHat(),
      dateOfBirth: newBirth,
      yearOfBirth: parseInt(newBirth.substring(6, 10)),
      ancestry: "half-blood",
      eyeColour: newEyeColor,
      hairColour: newHairColor,
      wand: {
          wood: "",
          core: "",
          length: 11
      },
      patronus: "",
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: newName,
      alive: true,
      image: defaultUser
    };
    console.log(newPhoto);
    postNewCharacter(newCharacter);
    fetchCharacters();
    showModal();
    alert("Se agregó un nuevo personaje");
  }

  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
      <div className="container-page">
        <div className="header-page">
          <div className="logo-container" onClick={clearFilters}>
            <img src={hpLogo} alt="Logo de Harry Potter" className="hp-logo"/>
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
                {characters.allCharacters?.favorites.length > 0 ? characters.allCharacters?.favorites?.map((item, index) => {
                  if (index === characters.allCharacters?.favorites.length - 1) {
                    return (<Dropdown.Item><img src={item.image} className="photo-drop" alt="Foto de perfil"/> {item.name}<img src={deleteIcon} alt="Borrar" className="delete-icon" onClick={() => deleteFavoriteCharacter(item)}/></Dropdown.Item>)
                  } else {
                    return (
                      <>
                        <Dropdown.Item><img src={item.image} className="photo-drop" alt="Foto de perfil"/> {item.name}<img src={deleteIcon} alt="Borrar" className="delete-icon" onClick={() => deleteFavoriteCharacter(item)}/></Dropdown.Item>
                        <Dropdown.Divider />
                      </>
                    )
                  }}) : (<Dropdown.Item>No hay personajes favoritos</Dropdown.Item>)}
              </DropdownButton>
            </div>
            <div className="add">
              <Btn className="add-text" variant="link" onClick={showModal}>AGREGAR <img src={addCharacterIcon} alt="FavIcon" className="add-icon-white"/></Btn>
            </div>
          </div>
        </div>
        <Modal
          show={!hideModal}
          onHide={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Agrega un personaje
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {width > 600 ? (
                <div className="form-container">
                  <div className="form-row-1">
                    <div className="form-col">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>NOMBRE</Form.Label>
                        <Form.Control type="text" className="input" onChange={(e) => setNewName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>COLOR DE OJOS</Form.Label>
                        <Form.Control type="text" className="input" onChange={(e) => setNewEyeColor(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ marginRight: "1rem" }}>GÉNERO</Form.Label>
                        <Form.Check inline type="radio" label="Mujer" id="1" onClick={() => { setNewGenderM(true); setNewGenderH(false); }} isValid={newGenderM}/>
                        <Form.Check inline type="radio" label="Hombre" id="2" onClick={() => { setNewGenderM(false); setNewGenderH(true); }} isValid={newGenderH}/>
                      </Form.Group>
                    </div>
                    <div className="form-col">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CUMPLEAÑOS</Form.Label>
                        <Form.Control type="text" className="input" onChange={(e) => setNewBirth(e.target.value)} placeholder="DD-MM-YYYY" maxLength={10}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>COLOR DE PELO</Form.Label>
                        <Form.Control type="text" className="input" onChange={(e) => setNewHairColor(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ marginRight: "1rem" }}>POSICIÓN</Form.Label>
                        <Form.Check inline type="radio" label="Estudiante" id="3" onClick={() => { setNewPositionE(true); setNewPositionS(false); }} isValid={newPositionE}/>
                        <Form.Check inline type="radio" label="Staff" id="4" onClick={() => { setNewPositionE(false); setNewPositionS(true); }} isValid={newPositionS}/>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="form-row-2">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>FOTOGRAFÍA</Form.Label>
                      <Form.Control type="file" onChange={(e) => setNewPhoto(e.target.value)}/>
                    </Form.Group>
                  </div>
                </div>
              ) : (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>NOMBRE</Form.Label>
                    <Form.Control type="text" className="input" onChange={(e) => setNewName(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>CUMPLEAÑOS</Form.Label>
                    <Form.Control type="text" className="input" onChange={(e) => setNewBirth(e.target.value)} placeholder="DD-MM-YYYY" maxLength={10}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>COLOR DE OJOS</Form.Label>
                    <Form.Control type="text" className="input" onChange={(e) => setNewEyeColor(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>COLOR DE PELO</Form.Label>
                    <Form.Control type="text" className="input" onChange={(e) => setNewHairColor(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ marginRight: "1rem" }}>GÉNERO</Form.Label>
                    <Form.Check inline type="radio" label="Mujer" id="1" onClick={() => { setNewGenderM(true); setNewGenderH(false); }} isValid={newGenderM}/>
                    <Form.Check inline type="radio" label="Hombre" id="2" onClick={() => { setNewGenderM(false); setNewGenderH(true); }} isValid={newGenderH}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ marginRight: "1rem" }}>POSICIÓN</Form.Label>
                    <Form.Check inline type="radio" label="Estudiante" id="3" onClick={() => { setNewPositionE(true); setNewPositionS(false); }} isValid={newPositionE}/>
                    <Form.Check inline type="radio" label="Staff" id="4" onClick={() => { setNewPositionE(false); setNewPositionS(true); }} isValid={newPositionS}/>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>FOTOGRAFÍA</Form.Label>
                    <Form.Control type="file" onChange={(e) => setNewPhoto(e.target.value)}/>
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button applyFilter={addNewCharacter} filterName="GUARDAR"/>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default HpLandingPage;
