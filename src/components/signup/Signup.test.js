import React from "react";
import { shallow } from "enzyme";
import { Signup } from "./Signup";
import RegistrationForm from "../common/forms/registrationForm/RegistrationForm";

describe("Signup Page", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(<Signup registerCustomer={jest.fn} history={history} />);
  });

  it("should render registration form", () => {
    expect(
      wrapper.containsMatchingElement(
        <RegistrationForm handleSubmit={wrapper.instance().handleSubmit} />
      )
    ).toEqual(true);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
