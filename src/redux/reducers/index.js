import { combineReducers } from "redux";
import { characterReducers } from "./characterReducers";

const reducers = combineReducers({
  allCharacters: characterReducers,
});

export default reducers;
