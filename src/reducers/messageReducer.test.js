import reducer from "./messageReducer";
import { GOT_MESSAGE } from "./constants";

describe("message reducer", () => {
  let message;
  let initialState;
  beforeEach(() => {
    message = { type: "success", text: "test message" };
    initialState = {
      message: {}
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({ message: {} });
  });

  it("should handle GOT_MESSAGE ", () => {
    expect(
      reducer(initialState, {
        type: GOT_MESSAGE,
        data: message
      })
    ).toEqual({
      message
    });
  });
});
