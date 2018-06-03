import reducer from "./ordersReducer";
import {
  ORDER_MEAL,
  CHECKOUT_ORDER,
  FETCH_ORDER,
  FETCH_ORDERS
} from "./constants";

describe("orders reducer", () => {
  let initialState;
  let order;
  beforeEach(() => {
    order = {
      id: 1,
      cost: 1000,
      meals: [{ id: 1, title: "test" }],
      customer: { email: "test@t.com" }
    };
    initialState = {
      order: {
        cost: 0,
        id: 0,
        meals: [],
        customer: {
          email: "",
          id: 0,
          name: ""
        },
        expiresAt: ""
      },
      cartOrder: {
        menuId: 0,
        meals: [],
        totalCost: 0,
        orderCount: 0,
        cost: 0
      },
      orders: [],
      meals: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle order a meal", () => {
    expect(
      reducer(initialState, {
        type: ORDER_MEAL,
        data: order
      })
    ).toEqual({
      ...initialState,
      order
    });
  });

  it("should handle CHECKOUT_ORDER", () => {
    const cartOrder = {
      menuId: 1,
      meals: [{ title: "meal lorem", id: 1, price: 1000 }],
      totalCost: 1000,
      orderCount: 1,
      cost: 1000
    };

    expect(
      reducer(initialState, { type: CHECKOUT_ORDER, data: cartOrder })
    ).toEqual({
      ...initialState,
      cartOrder
    });
  });

  it("should handle FETCH_ORDER", () => {
    expect(reducer(initialState, { type: FETCH_ORDER, data: order })).toEqual({
      ...initialState,
      order
    });
  });

  it("should handle FETCH_ORDERS", () => {
    const orders = [order];
    expect(reducer(initialState, { type: FETCH_ORDERS, data: orders })).toEqual(
      {
        ...initialState,
        orders
      }
    );
  });
});
