import React from "react";
import { shallow } from "enzyme";
import { BusinessSignupPage } from "./BusinessSignupPage";

describe("BusinessSignup", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(
      <BusinessSignupPage registerBusiness={jest.fn} history={history} />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
