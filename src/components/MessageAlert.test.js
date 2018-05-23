import React from "react";
import { shallow } from "enzyme";
import MessageAlert from "./MessageAlert";

describe("Message Alert", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MessageAlert text="test msg" type="info" />);
  });

  it("should display correct message", () => {
    expect(wrapper.find("div").text()).toBe("test msg");
  });

  it("should render the right alert type", () => {
    expect(wrapper.find("div").hasClass("alert alert-info")).toBe(true);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
