import React from "react";
import { shallow } from "enzyme";
import { Login } from "./Login";
import LoginForm from "../../components/common/forms/loginForm/LoginForm";

describe("LoginPage", () => {
  let wrapper;
  let mockFn;
  let history;
  beforeEach(() => {
    mockFn = jest.fn();
    history = {
      push: mockFn
    };
    const fn = () => Promise.resolve();
    wrapper = shallow(<Login loginUser={fn} history={history} />);
  });

  it("should render a login form", () => {
    const form = <LoginForm handleSubmit={wrapper.instance().handleSubmit} />;
    expect(wrapper.containsMatchingElement(form)).toEqual(true);
  });

  it("should handle submit", () => {
    const data = { username: "test", password: "test" };
    wrapper.instance().handleSubmit(data);
    expect(wrapper.instance().props.history).toEqual(history);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
