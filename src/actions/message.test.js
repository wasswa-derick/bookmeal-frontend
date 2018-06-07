import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./message";
import { GOT_MESSAGE } from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("message actions", () => {
  let data;
  beforeEach(() => {
    data = { type: "success", text: "test message" };
  });

  it("message action GOT_MESSAGE are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.setMessage(data));

    const expectedActions = [
      {
        type: GOT_MESSAGE,
        data
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
