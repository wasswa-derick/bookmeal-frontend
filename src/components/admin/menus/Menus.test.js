import React from "react";
import { shallow } from "enzyme";
import { Menus } from "./Menus";

const fn = () => Promise.resolve({});

describe("MenusPage", () => {
  let wrapper;
  beforeEach(() => {
    const menus = [
      {
        id: 1,
        title: "test",
        description: "test",
        menuDate: "",
        url: "",
        meals: [{ id: 1, title: "meal" }]
      }
    ];
    wrapper = shallow(<Menus menus={menus} getMenus={fn} deleteMenu={fn} />);
  });

  it("should set menu id to delete and delete menu", () => {
    wrapper.instance().setDeletionId(1);
    wrapper.instance().delete();
    const { menuId } = wrapper.instance().state;
    expect(menuId).toBe(1);
  });

  it("should contain a link to set new menu page", () => {
    const linkProps = wrapper
      .find("Link")
      .first()
      .props();
    expect(linkProps.to).toBe("/admin/menus/new");
  });

  it("should render table", () => {
    expect(wrapper.find("table").length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
