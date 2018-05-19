import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./auth";
import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("authentication actions", () => {
  let data;
  let expectedActions;
  let userCreatedAction;
  let businessData;

  beforeEach(() => {
    data = { email: "test@test.gmail", password: "test", name: "test" };
    businessData = {
      user: data,
      business: { address: "Kla", name: "ADU" }
    };
    userCreatedAction = {
      type: USER_CREATED,
      data
    };
    expectedActions = [
      userCreatedAction,
      {
        type: CREATE_BUSINESS_ACCOUNT,
        data: { user: data, business: { address: "Kla", name: "ADU" } }
      },
      {
        type: USER_LOGGED_IN,
        data: { email: "test@and.com", name: "test" }
      },
      {
        type: USER_LOGGED_OUT
      }
    ];
  });

  it("should create an action to create a user", () => {
    expect(actions.createdUser(data)).toEqual(userCreatedAction);
  });

  it("authentication actions are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.createdUser(data));
    store.dispatch(actions.createdBusiness(businessData));
    store.dispatch(
      actions.userLoggedIn({ email: "test@and.com", name: "test" })
    );
    store.dispatch(actions.userLoggedOut());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should perform async actions", () => {});
});
