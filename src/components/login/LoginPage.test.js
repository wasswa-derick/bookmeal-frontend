import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "./LoginPage";
import LoginForm from "../../components/forms";

describe("LoginPage", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(<LoginPage loginUser={jest.fn} history={history} />);
  });

  it("should render a login form", () => {
    const form = <LoginForm handleSubmit={wrapper.instance().handleSubmit} />;
    expect(wrapper.containsMatchingElement(form)).toEqual(true);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
