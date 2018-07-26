import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    const message = {
      type: "info",
      text: "test"
    };
    mockFn = jest.fn();
    wrapper = shallow(
      <NavBar
        isUserAuthenticated={false}
        isAdmin={false}
        logoutUser={mockFn}
        message={message}
      />
    );
  });

  it("should render a <nav/>", () => {
    expect(wrapper.find("nav").length).toEqual(1);
  });

  it("should logout a user", () => {
    wrapper.instance().logout();
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
