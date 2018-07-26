import React from "react";
import { shallow } from "enzyme";
import { OrdersHistory } from "./OrdersHistory";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("OrdersHistory", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrdersHistory getOrders={fn} orders={[]} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
