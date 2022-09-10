import { ActionTypes } from "../constants/action-types";

const initialState = {
  characters: [],
};

export const characterReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHARACTERS:
      return { ...state, characters: action.payload };
    default:
      return state;
  }
};
