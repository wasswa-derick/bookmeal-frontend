import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./Dashboard";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("Dashboard", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard getOrders={fn} orders={[]} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
