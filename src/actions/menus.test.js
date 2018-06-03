import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./menus";
import { FETCH_MENU, FETCH_MENUS, ADD_MENU } from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("meals actions", () => {
  let data;
  let expectedActions;

  beforeEach(() => {
    data = {
      id: 1,
      title: "test",
      description: "lorem description",
      meals: [{ id: 1 }]
    };

    expectedActions = [
      {
        type: FETCH_MENU,
        data
      },
      {
        type: FETCH_MENUS,
        data: [data]
      },
      {
        type: ADD_MENU,
        data
      }
    ];
  });

  it("should create an action to add menu", () => {
    expect(expectedActions[2]).toEqual({
      type: ADD_MENU,
      data
    });
  });

  it("menu actions are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.gotMenu(data));
    store.dispatch(actions.gotMenus([data]));
    store.dispatch(actions.createdMenu(data));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
