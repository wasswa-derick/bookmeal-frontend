import React from "react";
import { shallow } from "enzyme";
import BusinessSignupForm from "./BusinessSignupForm";
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
    wrapper = shallow(<BusinessSignupForm handleSubmit={mockFn} />);
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
