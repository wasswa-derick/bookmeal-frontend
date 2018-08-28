import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./Dashboard";

const asyncMockFn = () => Promise.resolve({});

describe("Dashboard", () => {
  let wrapper;
  beforeEach(() => {
    const orders = [
      {
        id: 1,
        cost: 400,
        expiresAt: "",
        meals: [
          {
            id: 1,
            title: ""
          }
        ],
        customer: {
          id: 1,
          name: "",
          email: ""
        }
      }
    ];
    wrapper = shallow(<Dashboard getOrders={asyncMockFn} orders={orders} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
