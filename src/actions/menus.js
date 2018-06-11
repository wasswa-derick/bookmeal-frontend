import axios from "axios";

import {
  FETCH_MENU,
  FETCH_MENUS,
  ADD_MENU,
  FETCH_TODAY_MENUS
} from "../reducers/constants";

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
    .post("/api/v1/menu", data, { headers })
    .then(res => dispatch(createdMenu(res.data)));
};

export const gotMenus = data => ({
  type: FETCH_MENUS,
  data
});

export const getMenus = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/api/v1/menus", { headers })
    .then(res => dispatch(gotMenus(res.data)));
};

export const gotMenu = data => ({
  type: FETCH_MENU,
  data
});

export const getMenu = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/api/v1/menu/${id}`, { headers })
    .then(res => dispatch(gotMenu(res.data)));
};

const gotCurrentDayMenu = data => ({
  type: FETCH_TODAY_MENUS,
  data
});

export const getTodayMenus = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/api/v1/menu`, { headers })
    .then(res => dispatch(gotCurrentDayMenu(res.data)));
};
