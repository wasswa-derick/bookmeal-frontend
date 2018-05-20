import reducer from "./mealsReducer";
import { CREATE_MEAL, FETCH_MEALS } from "./constants";

describe("auhentication reducer", () => {
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
    expect(reducer(undefined, {})).toEqual({ meal: {}, meals: [] });
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

  it("should handle FECTH_MEALS", () => {
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
});
