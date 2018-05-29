import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  let wrapper;
  beforeEach(() => {
    const message = {
      type: "info",
      text: "test"
    };
    wrapper = shallow(
      <NavBar
        isUserAuthenticated={false}
        isAdmin={false}
        logoutUser={jest.fn}
        message={message}
      />
    );
  });

  it("should render a <nav/>", () => {
    expect(wrapper.find("nav").length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
