import React from "react";
import { shallow } from "enzyme";
import MessageAlert, { getAlert } from "./MessageAlert";

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

  it("should return the correct alert type", () => {
    expect(getAlert("success")).toBe("alert alert-success");
    expect(getAlert("danger")).toBe("alert alert-danger");
    expect(getAlert("warning")).toBe("alert alert-warning");
    expect(getAlert("info")).toBe("alert alert-info");
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
