import {
  USER_CREATED,
  CREATE_BUSINESS_ACCOUNT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "./constants";

const initialState = {
  user: {},
  business: {}
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
    case CREATE_BUSINESS_ACCOUNT:
      return {
        ...state,
        business: action.data.business,
        user: action.data.user
      };
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.data
      };
    case USER_LOGGED_OUT:
      return state;
    default:
      return state;
  }
}
