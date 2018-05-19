import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <NavBar isUserAuthenticated={false} logoutUser={jest.fn} />
    );
  });

  it("should render a <nav/>", () => {
    expect(wrapper.find("nav").length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
