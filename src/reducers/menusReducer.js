import {
  FETCH_MENU,
  FETCH_MENUS,
  ADD_MENU,
  FETCH_TODAY_MENUS
} from "../reducers/constants";

const initialState = {
  menu: {
    id: 0,
    title: "",
    description: "",
    url: "",
    meals: [],
    menuDate: ""
  },
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
    case FETCH_TODAY_MENUS:
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
