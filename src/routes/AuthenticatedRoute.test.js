import React from "react";
import { shallow } from "enzyme";
import { AuthenticatedRoute } from "./AuthenticatedRoute";

describe("AuthenticatedRoute", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AuthenticatedRoute isUserAuthenticated component={HTMLDivElement} />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
