import reducer from "./authReducer";
import { USER_CREATED, CREATE_BUSINESS_ACCOUNT } from "./constants";

describe("auhentication reducer", () => {
  let userData;
  let businessData;
  beforeEach(() => {
    userData = { email: "test@test.com" };
    businessData = { address: "Kla ADU", name: "ADU" };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({ user: {}, business: {} });
  });

  it("should handle USER_CREATED ", () => {
    expect(
      reducer([], {
        type: USER_CREATED,
        data: userData
      })
    ).toEqual({
      user: userData
    });
  });

  it("should handle CREATE_BUSINESS_ACCOUNT", () => {
    expect(
      reducer([], {
        type: CREATE_BUSINESS_ACCOUNT,
        data: { user: userData, business: businessData }
      })
    );
  });
});
