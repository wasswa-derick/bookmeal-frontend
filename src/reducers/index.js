import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mealsReducer from "./mealsReducer";
import messageReducer from "./messageReducer";
import menusReducer from "./menusReducer";

export default combineReducers({
  authReducer,
  mealsReducer,
  messageReducer,
  menusReducer
});
