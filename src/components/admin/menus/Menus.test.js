import React from "react";
import { shallow } from "enzyme";
import { MenusPage } from "./Menus";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("MenusPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MenusPage menus={[]} getMenus={fn} />);
  });

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
