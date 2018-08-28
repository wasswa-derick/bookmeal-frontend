import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import * as actions from "./auth";
import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";
import instance from './axiosInstance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const registerCustomerMock = {
  id: 1,
  name: "test",
  email: "test@test.com"
};

const registerBusinessMock = {
  user: registerCustomerMock,
  business: { address: "Kla", name: "ADU" }
};

const loginMock = {
  token: jwt.sign({ email: "test@test.com", name: "test" }, "secret")
};

describe("authentication actions", () => {
  let data;
  let businessData;

  beforeEach(() => {
    // Object.defineProperty(window, "localStorage", {
    //   value: mockLocalStorage
    // });

    moxios.install(instance);
    data = { email: "test@test.com", password: "test", name: "test" };
    businessData = {
      user: data,
      business: { address: "Kla", name: "ADU" }
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("creates USER_CREATED action after successfully registering a user", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: registerCustomerMock
      });
    });

    const expectedAction = [
      {
        type: USER_CREATED,
        data: registerCustomerMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.registerCustomer(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("creates CREATED_BUSINESS_ACCOUNT action when a business is successfully registered", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: registerBusinessMock
      });
    });

    const expectedAction = [
      {
        type: CREATE_BUSINESS_ACCOUNT,
        data: registerBusinessMock
      }
    ];
    const store = mockStore({ data: {} });
    return store.dispatch(actions.registerBusiness(businessData)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("creates USER_LOGGED_IN action on successfully logging in a user", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: loginMock
      });
    });

    const user = jwtDecode(loginMock.token);

    const expectedAction = [
      {
        type: USER_LOGGED_IN,
        data: { ...user, isLoggedIn: true }
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.loginUser(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should create USER_LOGGED_OUT action when user logs out", () => {
    localStorage.setItem("authUserToken", loginMock.token);
    const store = mockStore({});
    const expectedAction = [{ type: USER_LOGGED_OUT }];
    store.dispatch(actions.logoutUser());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
