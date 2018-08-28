import http from './axiosInstance';
import {
  FETCH_MENU,
  FETCH_MENUS,
  ADD_MENU,
  FETCH_TODAY_MENUS,
  DELETED_MENU
} from "../reducers/constants";


export const createdMenu = data => ({
  type: ADD_MENU,
  data
});

export const addMenu = data => dispatch =>
  http
    .post("/menu", data)
    .then(res => dispatch(createdMenu(res.data)));

export const gotMenus = data => ({
  type: FETCH_MENUS,
  data
});

export const getMenus = () => dispatch => http
  .get("/menus")
  .then(res => dispatch(gotMenus(res.data)));


export const gotMenu = data => ({
  type: FETCH_MENU,
  data
});

export const getMenu = id => dispatch =>
  http
    .get(`/menu/${id}`)
    .then(res => dispatch(gotMenu(res.data)));


const gotCurrentDayMenu = data => ({
  type: FETCH_TODAY_MENUS,
  data
});

export const getTodayMenus = () => dispatch =>
  http
    .get(`/menu`)
    .then(res => dispatch(gotCurrentDayMenu(res.data)));


export const editMenu = (id, data) => dispatch =>
  http
    .put(`/menu/${id}`, data)
    .then(res => dispatch(gotMenu(res.data)));


export const menuDeleted = data => ({
  type: DELETED_MENU,
  data
});

export const deleteMenu = id => dispatch =>
  http
    .delete(`/menu/${id}`)
    .then(res => dispatch(menuDeleted(res.data)));

