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

export const setFavoritesCharacters = (favorite) => {
  return {
    type: ActionTypes.SET_FAVORITES_CHARACTERS,
    payload: favorite,
  };
};

export const removeFavoriteCharacters = (favorite) => {
  return {
    type: ActionTypes.REMOVE_FAVORITES_CHARACTERS,
    payload: favorite,
  };
};
