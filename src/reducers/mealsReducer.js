import { CREATE_MEAL, FETCH_MEALS, FETCH_MEAL } from "./constants";

const initialState = {
  meal: {
    id: 0,
    title: "",
    description: "",
    price: 0
  },
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
    case CREATE_MEAL:
      return {
        ...state,
        meal: action.data
      };
    case FETCH_MEALS:
      return {
        ...state,
        meals: action.data
      };
    case FETCH_MEAL:
      return {
        ...state,
        meal: action.data
      };
    default:
      return state;
  }
}
