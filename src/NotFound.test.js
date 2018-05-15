import React from "react";
import { shallow } from "enzyme";
import NotFound from "./NotFound";

describe("NotFound", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });

  it("should render a div with className: container", () => {
    expect(wrapper.find("div.container").length).toEqual(1);
  });

  it("should display 404 page not found error", () => {
    const text = wrapper.find("h1").text();
    expect(text).toEqual("404: Page Not Found");
  });
});
