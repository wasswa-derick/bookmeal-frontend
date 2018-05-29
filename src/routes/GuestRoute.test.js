import React from "react";
import { shallow } from "enzyme";
import { GuestRoute } from "./GuestRoute";

describe("Guest Route", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <GuestRoute isUserAuthenticated={false} component={HTMLDivElement} />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
