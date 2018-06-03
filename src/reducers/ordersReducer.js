import {
  ORDER_MEAL,
  FETCH_ORDER,
  FETCH_ORDERS,
  CHECKOUT_ORDER
} from "./constants";

const initialState = {
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

/**
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.data
      };
    case ORDER_MEAL:
    case FETCH_ORDER:
      return {
        ...state,
        order: action.data
      };

    case CHECKOUT_ORDER:
      return {
        ...state,
        cartOrder: action.data
      };

    default:
      return state;
  }
}
