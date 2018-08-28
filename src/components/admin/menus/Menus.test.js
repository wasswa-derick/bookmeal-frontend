import React from "react";
import { shallow } from "enzyme";
import { Menus } from "./Menus";

const fn = () => Promise.resolve({});

describe("MenusPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Menus menus={[]} getMenus={fn} deleteMenu={fn} />);
  });

  it("should set menu id to delete", () => {
    wrapper.instance().setDeletionId(1);
    const { menuId } = wrapper.instance().state;
    expect(menuId).toBe(1);
  });

  it("should delete menu", () => {});

  it("should contain a link to set new menu page", () => {
    const linkProps = wrapper.find("Link").props();
    expect(linkProps.to).toBe("/admin/menus/new");
  });

  it("should render table", () => {
    expect(wrapper.find("table").length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
