import React from "react";
import { shallow } from "enzyme";
import { BusinessSignup } from "./BusinessSignup";

describe("BusinessSignup", () => {
  let wrapper;
  let history;
  beforeEach(() => {
    history = {
      push: jest.fn
    };
    const fn = () => Promise.resolve();
    wrapper = shallow(
      <BusinessSignup registerBusiness={fn} history={history} />
    );
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
