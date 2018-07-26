import React from "react";
import { shallow } from "enzyme";
import { BusinessSignup } from "./BusinessSignup";

describe("BusinessSignup", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(
      <BusinessSignup registerBusiness={jest.fn} history={history} />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
