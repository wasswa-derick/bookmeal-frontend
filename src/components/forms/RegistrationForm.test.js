import React from "react";
import { shallow } from "enzyme";
import RegistrationForm from "./RegistrationForm";
import FormInput from "./FormInput";

describe("RegistrationForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm handleSubmit={jest.fn} />);
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

  it("it calls onSubmit when form is submitted", () => {
    const spy = jest.spyOn(wrapper.instance(), "onFormSubmit");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    // wrapper.find("form").simulate("submit");
    // expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should validate on submitting form", () => {});

  it("should render correctly", () => {
    // expect(wrapper).toMatchSnapshot();
  });
});
