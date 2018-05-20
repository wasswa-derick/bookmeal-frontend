import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./message";
import { GOT_MESSAGE } from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("message actions", () => {
  let data;
  let expectedActions;

  beforeEach(() => {
    data = { type: "success", text: "test message" };

    expectedActions = [
      {
        type: GOT_MESSAGE,
        data
      }
    ];
  });

  it("should create an action to meal", () => {
    expect(expectedActions[0]).toEqual({
      type: GOT_MESSAGE,
      data
    });
  });

  it("message actions are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.gotMessage(data));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
