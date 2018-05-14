import React from "react";
import { shallow } from "enzyme";
import InlineError from "./InlineError";

describe("InlineError", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InlineError text="this is an error message" />);
  });

  it("should render the error message", () => {
    const errorMsg = wrapper.find(".invalid-feedback").text();
    expect(errorMsg).toEqual("this is an error message");
  });
});
