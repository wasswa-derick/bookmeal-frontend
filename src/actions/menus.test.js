import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./menus";
import {
  FETCH_MENU,
  FETCH_MENUS,
  ADD_MENU,
  FETCH_TODAY_MENUS
} from "../reducers/constants";
import instance from './axiosInstance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const postMenuMock = {
  id: 1,
  title: "title menu",
  description: "menu desc",
  url: "",
  meals: [
    {
      id: 1,
      title: "title meal",
      price: 1009
    }
  ]
};

describe("meals actions", () => {
  let data;
  beforeEach(() => {
    moxios.install(instance);
    data = {
      title: "test",
      description: "lorem description",
      meals: [1]
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should create ADD_MENU action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postMenuMock
      });
    });

    const expectedAction = [
      {
        type: ADD_MENU,
        data: postMenuMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.addMenu(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch FETCH_MENU action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postMenuMock
      });
    });

    const expectedAction = [
      {
        type: FETCH_MENU,
        data: postMenuMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getMenu(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch FETCH_MENUS action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [postMenuMock]
      });
    });

    const expectedAction = [
      {
        type: FETCH_MENUS,
        data: [postMenuMock]
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getMenus()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should dispatch FETCH_TODAY_MENUS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [postMenuMock]
      });
    });

    const expectedAction = [
      {
        type: FETCH_TODAY_MENUS,
        data: [postMenuMock]
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getTodayMenus()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
