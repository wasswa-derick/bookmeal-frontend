import axios from "axios";
import { USER_CREATED } from "../reducers/constants";

export const createdUSer = data => ({
  type: USER_CREATED,
  data
});

export const registerCustomer = data => dispatch =>
  axios.post("/auth/signup", data).then(res => dispatch(createdUSer(res.data)));
