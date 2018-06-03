import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mealsReducer from "./mealsReducer";
import messageReducer from "./messageReducer";
import menusReducer from "./menusReducer";
import ordersReducer from "./ordersReducer";

export default combineReducers({
  authReducer,
  mealsReducer,
  messageReducer,
  menusReducer,
  ordersReducer
});
