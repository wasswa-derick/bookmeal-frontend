import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./meals";
import {
  CREATE_MEAL,
  FETCH_MEALS,
  FETCH_MEAL,
  EDITED_MEAL,
  DELETED_MEAL
} from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("meals actions", () => {
  let data;
  let expectedActions;

  beforeEach(() => {
    data = { id: 1, title: "test" };

    expectedActions = [
      {
        type: CREATE_MEAL,
        data
      },
      {
        type: FETCH_MEALS,
        data: [data]
      },
      {
        type: DELETED_MEAL
      },
      {
        type: FETCH_MEAL,
        data
      },
      {
        type: EDITED_MEAL,
        data
      }
    ];
  });

  it("should create an action to create meal", () => {
    expect(expectedActions[0]).toEqual({
      type: CREATE_MEAL,
      data
    });
  });

  it("meal actions are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.createdMeal(data));
    store.dispatch(actions.gotMeals([data]));
    store.dispatch(actions.deletedMeal());
    store.dispatch(actions.gotMeal(data));
    store.dispatch(actions.editedMeal(data));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should perform meal async actions", () => {});
});
