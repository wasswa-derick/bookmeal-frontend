import { shallow } from "enzyme";
import React from "react";
import App from "./App";

describe("App Component", () => {
  let wrapper;
  it("renders  div", () => {
    const location = {
      pathname: ""
    };
    wrapper = shallow(<App location={location} />);
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
