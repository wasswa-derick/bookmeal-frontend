import { FETCH_MENU, FETCH_MENUS, ADD_MENU } from "../reducers/constants";

const initialState = {
  menu: {},
  menus: []
};

/**
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {any} state
 */
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_MENU:
      return {
        ...state,
        menu: action.data.menu
      };
    case FETCH_MENUS:
      return {
        ...state,
        menus: action.data.menus
      };

    case ADD_MENU:
      return {
        ...state,
        menu: action.data.menu
      };
    default:
      return state;
  }
}
