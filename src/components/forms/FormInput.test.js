import React from "react";
import { shallow } from "enzyme";
import FormInput from "./FormInput";

describe("FormInput", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <FormInput
        onChange={jest.fn}
        name="test"
        type="text"
        label="Test"
        value=""
        error=""
      />
    );
  });

  it("renders <input />", () => {
    expect(wrapper.find("input").length).toEqual(1);
  });

  it("displays the right label", () => {
    const text = wrapper.find("label").text();
    expect(text).toEqual("Test");
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
