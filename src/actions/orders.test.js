import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./orders";
import instance from './axiosInstance';
import {
  FETCH_ORDER,
  FETCH_ORDERS,
  ORDER_MEAL,
  CHECKOUT_ORDER
} from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const postOrderMock = {
  cost: 15000,
  orderCount: 2,
  meals: [{ id: 1, price: 75000, title: "meal title" }]
};

const postOrdersMock = {
  orders: [postOrderMock]
};

describe("orders actions", () => {
  let data;
  beforeEach(() => {

    moxios.install(instance);
    data = {
      cost: 15000,
      meals: [{ id: 1, title: "meal title", price: 75000 }],
      orderCount: 2
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should dispatch FETCH_ORDER actions", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postOrderMock
      });
    });

    const expectedAction = [
      {
        type: FETCH_ORDER,
        data: postOrderMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getOrder(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch FETCH_ORDERS action to the store", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postOrdersMock
      });
    });

    const expectedAction = [
      {
        type: FETCH_ORDERS,
        data: [postOrderMock]
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch CHECK_OUT_ORDER to the store", () => {
    const expectedAction = [
      {
        type: CHECKOUT_ORDER,
        data: postOrderMock
      }
    ];

    const store = mockStore({ data: {} });
    store.dispatch(actions.orderMeals(data));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("should dispatch ORDER_MEAL action to the store", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postOrderMock
      });
    });
    const expectedAction = [
      {
        type: ORDER_MEAL,
        data: postOrderMock
      }
    ];
    const store = mockStore({ data: {} });
    return store.dispatch(actions.postOrder(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch ORDER_MEAL when a meal is modified", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postOrderMock
      });
    });
    const expectedAction = [
      {
        type: ORDER_MEAL,
        data: postOrderMock
      }
    ];
    const store = mockStore({ data: {} });
    return store.dispatch(actions.modifyOrder(1, data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch FETCH_ORDERS action to the store when customer gets their orders", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postOrdersMock
      });
    });

    const expectedAction = [
      {
        type: FETCH_ORDERS,
        data: [postOrderMock]
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getMyOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
