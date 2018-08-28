import React from "react";
import { shallow } from "enzyme";
import { OrdersHistory } from "./OrdersHistory";

const fn = () => Promise.resolve({});

describe("OrdersHistory", () => {
  let wrapper;
  beforeEach(() => {
    const orders = [
      {
        id: 1,
        cost: 2000,
        orderCount: 1,
        expiresAt: "",
        createdAt: "",
        meals: [{ id: 1, title: "title" }],
        customer: { id: 1, name: "test", email: "" }
      }
    ];
    wrapper = shallow(<OrdersHistory getOrders={fn} orders={orders} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
