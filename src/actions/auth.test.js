import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./auth";
import { USER_CREATED } from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("authentication actions", () => {
  let data;
  let expectedActions;
  let userCreatedAction;

  beforeEach(() => {
    data = { email: "test@test.gmail", password: "test", name: "test" };
    userCreatedAction = {
      type: USER_CREATED,
      data
    };
    expectedActions = [userCreatedAction];
  });

  it("should create an action to create a user", () => {
    expect(actions.createdUSer(data)).toEqual(userCreatedAction);
  });

  it("USER_CREATED is dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.createdUSer(data));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
