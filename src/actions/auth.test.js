import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./auth";
import { USER_CREATED, CREATE_BUSINESS_ACCOUNT } from "../reducers/constants";

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
    expect(store.getActions()).toEqual(expectedActions);
  });
});
