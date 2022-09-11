import { ActionTypes } from "../constants/action-types";

const initialState = {
  characters: [],
  favorites: [],
};

export const characterReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHARACTERS:
      return { ...state, characters: action.payload };
    case ActionTypes.ADD_CHARACTER:
      return { ...state, characters: [ ...state.characters, action.payload ] };
    case ActionTypes.SET_FAVORITES_CHARACTERS:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case ActionTypes.REMOVE_FAVORITES_CHARACTERS:
      return { ...state, favorites: state.favorites.filter((item) => item.name !== action.payload.name)}
    default:
      return state;
  }
};
