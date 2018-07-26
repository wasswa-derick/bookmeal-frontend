import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./Dashboard";

const asyncMockFn = () => Promise.resolve({});

describe("Dashboard", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard getOrders={asyncMockFn} orders={[]} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
