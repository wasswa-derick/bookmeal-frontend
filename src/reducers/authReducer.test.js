import reducer from "./authReducer";
import { USER_CREATED } from "./constants";

describe("auhentication reducer", () => {
  let userData;

  beforeEach(() => {
    userData = { email: "test@test.com" };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({ user: {} });
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
});
