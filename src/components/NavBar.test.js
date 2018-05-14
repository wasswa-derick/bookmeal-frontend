import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

describe("NavBar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it("should render a <nav/>", () => {
    expect(wrapper.find("nav").length).toEqual(1);
  });
});
