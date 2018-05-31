import reducer from "./menusReducer";
import { ADD_MENU, FETCH_MENU, FETCH_MENUS } from "./constants";

describe("menus reducer", () => {
  let menu;
  let initialState;
  beforeEach(() => {
    menu = { id: 1, title: "menu title", date: "2018-05-03" };
    initialState = {
      menu: {},
      menus: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      menu: {},
      menus: []
    });
  });

  it("should handle ADD_MENU ", () => {
    expect(
      reducer(initialState, {
        type: ADD_MENU,
        data: { menu }
      })
    ).toEqual({
      menu,
      menus: []
    });
  });

  it("should handle FETCH_MENUS", () => {
    expect(
      reducer(initialState, {
        type: FETCH_MENUS,
        data: { menus: [menu] }
      })
    ).toEqual({
      menu: {},
      menus: [menu]
    });
  });

  it("should handle FETCH_MENU", () => {
    expect(
      reducer(initialState, {
        type: FETCH_MENU,
        data: { menu }
      })
    ).toEqual({ menu, menus: [] });
  });
});
