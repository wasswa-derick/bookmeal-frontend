import { CREATE_MEAL, FETCH_MEALS } from "./constants";

const initialState = {
  meal: {},
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
    default:
      return state;
  }
}
