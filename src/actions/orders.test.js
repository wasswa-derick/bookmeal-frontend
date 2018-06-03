import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./orders";
import {
  FETCH_ORDER,
  FETCH_ORDERS,
  ORDER_MEAL,
  CHECKOUT_ORDER
} from "../reducers/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("orders actions", () => {
  let data;
  let expectedActions;

  beforeEach(() => {
    data = {
      id: 1,
      meals: [{ id: 1, title: "test" }],
      orderCount: 1
    };

    expectedActions = [
      {
        type: FETCH_ORDER,
        data
      },
      {
        type: FETCH_ORDERS,
        data: [data]
      },
      {
        type: ORDER_MEAL,
        data
      },
      {
        type: CHECKOUT_ORDER,
        data
      }
    ];
  });

  it("order actions are dispatched to redux store", () => {
    const store = mockStore({ data: {} });
    store.dispatch(actions.gotOrder(data));
    store.dispatch(actions.gotOrders([data]));
    store.dispatch(actions.orderedMeal(data));
    store.dispatch(actions.gotCheckoutOrder(data));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
