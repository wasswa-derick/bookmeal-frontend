import React from "react";
import { shallow } from "enzyme";
import RegistrationForm from "./RegistrationForm";
import FormInput from "../formInput/FormInput";

const err = {
  response: {
    status: 400,
    data: {
      errors: {
        title: "This field is required"
      }
    }
  }
};
const mockFn = () => Promise.reject(err);

describe("RegistrationForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm handleSubmit={mockFn} />);
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

  it("should render a link to login", () => {
    const linkProps = wrapper.find("Link").props();
    expect(linkProps.to).toBe("/login");
  });

  it("should change state on change of target value", () => {
    const evt = {
      target: {
        name: "password",
        value: "password1"
      }
    };

    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.password).toBe("password1");
  });

  it("it calls onSubmit when form is submitted", () => {
    const spy = jest.spyOn(wrapper.instance(), "onFormSubmit");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it("should validate on submitting form", () => {
    wrapper.instance().onFormSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This field is required");
    expect(errors.password).toBe("This field is required");
    expect(errors.name).toBe("This field is required");
  });

  it("should validate email on submit", () => {
    const evt = {
      target: { name: "email", value: "test@" }
    };

    wrapper.instance().onChange(evt);
    wrapper.instance().onFormSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This email is invalid");
  });

  it("should handle errors on submiting form", () => {
    wrapper.instance().setState({
      data: {
        name: "test",
        email: "test@t.com",
        password: "test"
      }
    });
    wrapper.instance().onFormSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors).toEqual({});
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
