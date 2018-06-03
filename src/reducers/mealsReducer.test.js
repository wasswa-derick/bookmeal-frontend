import reducer from "./mealsReducer";
import { CREATE_MEAL, FETCH_MEALS, FETCH_MEAL } from "./constants";

describe("meals reducer", () => {
  let meal;
  let initialState;
  beforeEach(() => {
    meal = { id: 1, title: "meal title" };
    initialState = {
      meal: {},
      meals: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      meal: {
        id: 0,
        title: "",
        description: "",
        price: 0
      },
      meals: []
    });
  });

  it("should handle CREATE_MEAL ", () => {
    expect(
      reducer(initialState, {
        type: CREATE_MEAL,
        data: meal
      })
    ).toEqual({
      meal,
      meals: []
    });
  });

  it("should handle FETCH_MEALS", () => {
    expect(
      reducer(initialState, {
        type: FETCH_MEALS,
        data: [meal]
      })
    ).toEqual({
      meal: {},
      meals: [meal]
    });
  });

  it("should handle FETCH_MEAL", () => {
    expect(
      reducer(initialState, {
        type: FETCH_MEAL,
        data: meal
      })
    ).toEqual({ meal, meals: [] });
  });
});
