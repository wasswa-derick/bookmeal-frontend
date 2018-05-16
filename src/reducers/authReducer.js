import { USER_CREATED } from "./constants";

const initialState = {
  user: {}
};

/**
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case USER_CREATED:
      return {
        ...state,
        user: action.data
      };

    default:
      return state;
  }
}
