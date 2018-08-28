import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./meals";
import {
  CREATE_MEAL,
  FETCH_MEALS,
  FETCH_MEAL,
  EDITED_MEAL,
  DELETED_MEAL
} from "../reducers/constants";
import instance from './axiosInstance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const postMealMock = {
  id: 1,
  title: "test title",
  description: "test desc",
  price: 1000
};

const fetchMealsMock = {
  meals: [postMealMock]
};

describe("meals actions", () => {
  let data;
  beforeEach(() => {
    moxios.install(instance);
    data = { title: "test", description: "test desc", price: 1000 };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should create CREATE_MEAL action when admin create a admin creates a meal", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postMealMock
      });
    });

    const expectedAction = [
      {
        type: CREATE_MEAL,
        data: postMealMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.postMeal(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should create FETCH_MEALS action when user fetches meals", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: fetchMealsMock
      });
    });

    const expectedAction = [
      {
        type: FETCH_MEALS,
        data: [postMealMock]
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getMeals()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should create a FETCH_MEAL action when user views a meal", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postMealMock
      });
    });
    const expectedAction = [
      {
        type: FETCH_MEAL,
        data: postMealMock
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.getMeal(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should create a DELETED_MEAL action when caterer deletes a meal", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { status: "succesfully deleted" }
      });
    });

    const expectedAction = [
      {
        type: DELETED_MEAL
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.deleteMeal(1)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("should create a EDITED_MEAL action when caterer deletes a meal", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: postMealMock
      });
    });

    const expectedAction = [{ type: EDITED_MEAL, data: postMealMock }];

    const store = mockStore({ data: {} });
    return store.dispatch(actions.editMeal(postMealMock)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
