import axios from "axios";
import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";

const tokenName = "bookMeal:authUser";

export const createdUser = data => ({
  type: USER_CREATED,
  data
});

export const createdBusiness = data => ({
  type: CREATE_BUSINESS_ACCOUNT,
  data
});

export const userLoggedIn = data => ({
  type: USER_LOGGED_IN,
  data
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const registerCustomer = data => dispatch =>
  axios.post("/auth/signup", data).then(res => dispatch(createdUser(res.data)));

export const registerBusiness = data => dispatch =>
  axios
    .post("/auth/business/signup", data)
    .then(res => dispatch(createdBusiness(res.data)));

export const loginUser = data => dispatch =>
  axios.post("/auth/login", data).then(res => {
    // get token and store it in localStorage
    const { token } = res.data.token;
    localStorage.setItem(tokenName, token);
    return dispatch(userLoggedIn(res.data.user));
  });

export const logoutUser = () => dispatch => {
  localStorage.removeItem(tokenName);
  return dispatch(userLoggedOut());
};
