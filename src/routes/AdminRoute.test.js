import React from "react";
import { shallow } from "enzyme";
import { AdminRoute } from "./AdminRoute";

describe("AdminRoute", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AdminRoute
        isUserAuthenticated
        isAdmin={false}
        component={HTMLDivElement}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
