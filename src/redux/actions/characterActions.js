import { ActionTypes } from "../constants/action-types";

export const setCharacters = (characters) => {
  return {
    type: ActionTypes.SET_CHARACTERS,
    payload: characters,
  };
};

export const addCharacter = (character) => {
  return {
    type: ActionTypes.ADD_CHARACTER,
    payload: character,
  };
};
