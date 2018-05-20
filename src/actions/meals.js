import axios from "axios";
import { CREATE_MEAL, FETCH_MEALS } from "../reducers/constants";

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
    .post("/meals", data, { headers })
    .then(res => dispatch(createdMeal(res.data)));
};

export const getMeals = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/meals", { headers })
    .then(res => dispatch(gotMeals(res.data.meals)));
};
