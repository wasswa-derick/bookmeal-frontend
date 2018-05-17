import axios from "axios";
import { USER_CREATED, CREATE_BUSINESS_ACCOUNT } from "../reducers/constants";

export const createdUser = data => ({
  type: USER_CREATED,
  data
});

export const createdBusiness = data => ({
  type: CREATE_BUSINESS_ACCOUNT,
  data
});

export const registerCustomer = data => dispatch =>
  axios.post("/auth/signup", data).then(res => dispatch(createdUser(res.data)));

export const registerBusiness = data => dispatch =>
  axios
    .post("/auth/business/signup", data)
    .then(res => dispatch(createdBusiness(res.data)));
