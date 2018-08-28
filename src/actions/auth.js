
import jwtDecode from "jwt-decode";
import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";
import http from "./axiosInstance";

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
  http
    .post("/auth/signup", data)
    .then(res => dispatch(createdUser(res.data)));

export const registerBusiness = data => dispatch =>
  http
    .post("/auth/business/signup", data)
    .then(res => dispatch(createdBusiness(res.data)));

export const loginUser = data => dispatch =>
  http.post("/auth/login", data).then(res => {
    // get token and store it in localStorage
    const { token } = res.data;
    localStorage.setItem("authUserToken", token);
    const user = jwtDecode(token);

    return dispatch(userLoggedIn({ ...user, isLoggedIn: true }));
  });

export const logoutUser = () => dispatch => {
  localStorage.removeItem("authUserToken");
  return dispatch(userLoggedOut());
};
