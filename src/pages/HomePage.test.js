import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";
import NavBar from "../components/NavBar";

describe("HomePage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  it("should render a <div/>", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });

  it("should render a <div/>", () => {
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(true);
  });
});
