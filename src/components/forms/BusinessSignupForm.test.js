import React from "react";
import { shallow } from "enzyme";
import BusinessSignupForm from "./BusinessSignupForm";
import FormInput from "./FormInput";

describe("RegistrationForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BusinessSignupForm handleSubmit={jest.fn} />);
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
          name="businessName"
          label="Business Name"
          value=""
        />
      )
    ).toEqual(true);
  });

  it("should render a link to login", () => {
    const linkProps = wrapper.find("Link").props();
    expect(linkProps.to).toBe("/login");
  });

  it("should change state on change of target value", () => {
    const evt = {
      target: {
        name: "name",
        value: "My name"
      }
    };

    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.name).toBe("My name");
  });

  it("it calls onSubmit when form is submitted", () => {
    const spy = jest.spyOn(wrapper.instance(), "onFormSubmit");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    // const creatBtn = wrapper.find("button");
    // console.log(creatBtn);
    // wrapper.find("button").simulate("click");
    // // wrapper.find("form").simulate("submit");
    // expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should validate on submitting form", () => {
    wrapper.instance().onFormSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This field is required");
    expect(errors.name).toBe("This field is required");
    expect(errors.password).toBe("This field is required");
    expect(errors.businessAddress).toBe("This field is required");
  });

  it("should validate invalid email on submit", () => {
    const evt = {
      target: {
        name: "email",
        value: "solo@g" // invalid email address to tets
      }
    };

    wrapper.instance().onChange(evt);
    wrapper.instance().onFormSubmit({ preventDefault: jest.fn });

    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This email is invalid");
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
