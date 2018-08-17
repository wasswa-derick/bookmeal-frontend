import React from "react";
import { shallow } from "enzyme";
import { AdminRoute } from "./AdminRoute";

describe("AdminRoute", () => {
  let wrapper;
  beforeEach(() => {
    const component = () => <h1>Test</h1>;
    wrapper = shallow(
      <AdminRoute isUserAuthenticated isAdmin component={component} />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
