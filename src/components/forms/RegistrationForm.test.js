import React from "react";
import { shallow } from "enzyme";
import RegistrationForm from "./RegistrationForm";
import FormInput from "./FormInput";

describe("RegistrationForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm />);
  });

  it("should render form", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should render the FormInput component for Name", () => {
    expect(
      wrapper.containsMatchingElement(
        <FormInput
          onChange={wrapper.instance().onChange}
          type="text"
          name="name"
          label="Full Name"
          value=""
        />
      )
    ).toEqual(true);
  });

  it("should render a link to login", () => {});

  it("should change state on change of value", () => {});

  it("should submit form", () => {});

  it("should validate on submitting form", () => {});
});
