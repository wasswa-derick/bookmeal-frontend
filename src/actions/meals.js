import axios from "axios";
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

const makeHeaders = () => ({
  Authorization: localStorage.getItem("authUserToken")
});

export const postMeal = data => dispatch => {
  const headers = makeHeaders();
  return axios
    .post("/api/v1/meals", data, { headers })
    .then(res => dispatch(createdMeal(res.data)));
};

export const getMeals = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/api/v1/meals", { headers })
    .then(res => dispatch(gotMeals(res.data.meals)));
};

export const deletedMeal = () => ({
  type: DELETED_MEAL
});

export const deleteMeal = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .delete(`/api/v1/meals/${id}`, { headers })
    .then(() => dispatch(deletedMeal()));
};

export const gotMeal = data => ({
  type: FETCH_MEAL,
  data
});

export const getMeal = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/api/v1/meals/${id}`, { headers })
    .then(res => dispatch(gotMeal(res.data)));
};

export const editedMeal = data => ({
  type: EDITED_MEAL,
  data
});

export const editMeal = data => dispatch => {
  const headers = makeHeaders();
  return axios
    .put(`/api/v1/meals/${data.id}`, data, { headers })
    .then(res => dispatch(editedMeal(res.data)));
};
