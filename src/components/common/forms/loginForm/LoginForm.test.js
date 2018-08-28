import React from "react";
import { shallow } from "enzyme";
import LoginForm from "./LoginForm";
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

describe("LoginForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginForm handleSubmit={mockFn} />);
  });

  it("should render form", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should render the FormInput component for email", () => {
    expect(
      wrapper.containsMatchingElement(
        <FormInput
          onChange={wrapper.instance().onChange}
          type="email"
          name="email"
          label="Email"
          value=""
        />
      )
    ).toEqual(true);
  });

  it("should render a link to login", () => {
    const linkProps = wrapper.find("Link").props();
    expect(linkProps.to).toBe("/signup");
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

  it("should validate on submitting form", () => {
    wrapper.instance().onSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This field is required");
    expect(errors.password).toBe("This field is required");
  });

  it("should validate email on submit", () => {
    const evt = {
      target: { name: "email", value: "test@" }
    };

    wrapper.instance().onChange(evt);
    wrapper.instance().onSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors.email).toBe("This email is invalid");
  });

  it("should handle errors on submiting form", () => {
    wrapper.instance().setState({
      data: {
        email: "test@t.com",
        password: "test"
      }
    });
    wrapper.instance().onSubmit({ preventDefault: jest.fn });
    const { errors } = wrapper.instance().state;
    expect(errors).toEqual({});
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
