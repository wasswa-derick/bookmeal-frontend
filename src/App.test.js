import { shallow } from "enzyme";
import React from "react";
import App from "./App";

describe("App Component", () => {
  it("renders  div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").length).toEqual(1);
  });
});
