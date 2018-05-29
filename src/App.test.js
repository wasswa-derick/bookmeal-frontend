import { shallow } from "enzyme";
import React from "react";
import App from "./App";

describe("App Component", () => {
  it("renders  div", () => {
    const location = {
      pathname: ""
    };
    const wrapper = shallow(<App location={location} />);
    expect(wrapper.find("div").length).toEqual(1);
  });

  // TODO: add test for rendering correctly
});
