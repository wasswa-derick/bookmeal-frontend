import { GOT_MESSAGE } from "./constants";

const initialState = {
  message: {
    text: "",
    show: false
  }
};

/**
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case GOT_MESSAGE:
      return {
        message: action.data
      };
    default:
      return state;
  }
}
