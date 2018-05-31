import axios from "axios";

import { FETCH_MENU, FETCH_MENUS, ADD_MENU } from "../reducers/constants";

const makeHeaders = () => ({
  Authorization: localStorage.getItem("authUserToken")
});

export const createdMenu = data => ({
  type: ADD_MENU,
  data
});

export const addMenu = data => dispatch => {
  const headers = makeHeaders();
  return axios
    .post("/menu", data, { headers })
    .then(res => dispatch(createdMenu(res.data)));
};

export const gotMenus = data => ({
  type: FETCH_MENUS,
  data
});

export const getMenus = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/menus", { headers })
    .then(res => dispatch(gotMenus(res.data)));
};

export const gotMenu = data => ({
  type: FETCH_MENU,
  data
});

export const getTodayMenu = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/menu`, { headers })
    .then(res => dispatch(gotMenu(res.data)));
};
