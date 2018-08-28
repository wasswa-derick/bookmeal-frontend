import http from "./axiosInstance";
import {
  ORDER_MEAL,
  FETCH_ORDER,
  FETCH_ORDERS,
  CHECKOUT_ORDER
} from "../reducers/constants";


export const gotOrder = data => ({
  type: FETCH_ORDER,
  data
});

export const orderedMeal = data => ({
  type: ORDER_MEAL,
  data
});

export const gotOrders = data => ({
  type: FETCH_ORDERS,
  data
});

export const gotCheckoutOrder = data => ({
  type: CHECKOUT_ORDER,
  data
});

export const orderMeals = data => dispatch => {
  sessionStorage.setItem("cartOrder", JSON.stringify(data));
  return dispatch(gotCheckoutOrder(data));
};

export const getOrders = () => dispatch => http
  .get("/orders")
  .then(res => dispatch(gotOrders(res.data.orders)));

export const getMyOrders = () => dispatch =>
  http
    .get("/myorders")
    .then(res => dispatch(gotOrders(res.data.orders)));


export const getOrder = id => dispatch => http
  .get(`/orders/${id}`)
  .then(res => dispatch(gotOrder(res.data)));


export const postOrder = data => dispatch => http
  .post("/orders", data)
  .then(res => dispatch(orderedMeal(res.data)));


export const modifyOrder = (id, data) => dispatch =>
  http
    .put(`/orders/${id}`, data)
    .then(res => dispatch(orderedMeal(res.data)));

