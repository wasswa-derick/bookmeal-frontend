import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mealsReducer from "./mealsReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  authReducer,
  mealsReducer,
  messageReducer
});
