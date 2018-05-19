import reducer from "./authReducer";
import rootReducer from "./index";
import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "./constants";

describe("auhentication reducer", () => {
  let userData;
  let businessData;
  let initialState;
  beforeEach(() => {
    userData = { email: "test@test.com" };
    businessData = { address: "Kla ADU", name: "ADU" };
    initialState = {
      user: {},
      business: {}
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({ user: {}, business: {} });
  });

  it("should handle USER_CREATED ", () => {
    expect(
      reducer(initialState, {
        type: USER_CREATED,
        data: userData
      })
    ).toEqual({
      business: {},
      user: userData
    });
  });

  it("should handle CREATE_BUSINESS_ACCOUNT", () => {
    expect(
      reducer(initialState, {
        type: CREATE_BUSINESS_ACCOUNT,
        data: { user: userData, business: businessData }
      })
    ).toEqual({
      business: businessData,
      user: userData
    });
  });

  it("should handle action type USER_LOGGED_IN", () => {
    expect(
      reducer(initialState, { type: USER_LOGGED_IN, data: userData })
    ).toEqual({
      business: {},
      user: userData
    });
  });

  it("should handle action type USER_LOGGED_OUT", () => {
    expect(reducer(initialState, { type: USER_LOGGED_OUT })).toEqual({
      user: {},
      business: {}
    });
  });

  it("should export combine reducer", () => {
    expect(rootReducer).toBeDefined();
  });
});
