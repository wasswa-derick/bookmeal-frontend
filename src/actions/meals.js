import http from "./axiosInstance";
import {
  CREATE_MEAL,
  FETCH_MEALS,
  DELETED_MEAL,
  FETCH_MEAL,
  EDITED_MEAL
} from "../reducers/constants";

export const createdMeal = data => ({
  type: CREATE_MEAL,
  data
});

export const gotMeals = data => ({
  type: FETCH_MEALS,
  data
});

export const postMeal = data => dispatch =>
  http
    .post("/meals", data)
    .then(res => dispatch(createdMeal(res.data)));


export const getMeals = () => dispatch => http
  .get("/meals")
  .then(res => dispatch(gotMeals(res.data.meals)));


export const deletedMeal = () => ({
  type: DELETED_MEAL
});

export const deleteMeal = id => dispatch =>
  http
    .delete(`/meals/${id}`)
    .then(() => dispatch(deletedMeal()));


export const gotMeal = data => ({
  type: FETCH_MEAL,
  data
});

export const getMeal = id => dispatch =>
  http
    .get(`/meals/${id}`)
    .then(res => dispatch(gotMeal(res.data)));


export const editedMeal = data => ({
  type: EDITED_MEAL,
  data
});

export const editMeal = data => dispatch => http
  .put(`/meals/${data.id}`, data)
  .then(res => dispatch(editedMeal(res.data)));
;
