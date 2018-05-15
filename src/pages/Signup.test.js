import React from "react";
import { shallow } from "enzyme";
import Signup from "./Signup";
import RegistrationForm from "../components/forms/RegistrationForm";

describe("Signup Page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Signup />);
  });

  it("should render registration form", () => {
    expect(wrapper.containsMatchingElement(<RegistrationForm />)).toEqual(true);
  });
});
