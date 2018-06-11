import axios from "axios";
import {
  ORDER_MEAL,
  FETCH_ORDER,
  FETCH_ORDERS,
  CHECKOUT_ORDER
} from "../reducers/constants";

const makeHeaders = () => ({
  Authorization: localStorage.getItem("authUserToken")
});

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

export const getCartOrder = () => dispatch => {
  const data = sessionStorage.getItem("cartOrder");
  if (data == null) {
    return dispatch(
      gotCheckoutOrder({
        menuId: 0,
        meals: [],
        totalCost: 0,
        itemCount: 0,
        cost: 0,
        mealIds: []
      })
    );
  }
  return dispatch(gotCheckoutOrder(JSON.parse(data)));
};

export const getOrders = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/api/v1/orders", { headers })
    .then(res => dispatch(gotOrders(res.data.orders)));
};

export const getMyOrders = () => dispatch => {
  const headers = makeHeaders();
  return axios
    .get("/api/v1/myorders", { headers })
    .then(res => dispatch(gotOrders(res.data.orders)));
};

export const getOrder = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/api/v1/orders/${id}`, { headers })
    .then(res => dispatch(gotOrder(res.data)));
};

export const postOrder = data => dispatch => {
  const headers = makeHeaders();
  return axios
    .post("/api/v1/orders", data, { headers })
    .then(res => dispatch(orderedMeal(res.data)));
};

export const modifyOrder = (id, data) => dispatch => {
  const headers = makeHeaders();
  return axios
    .put(`/api/v1/orders/${id}`, data, { headers })
    .then(res => dispatch(orderedMeal(res.data)));
};
