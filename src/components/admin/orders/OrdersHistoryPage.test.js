import React from "react";
import { shallow } from "enzyme";
import { OrdersHistoryPage } from "./OrdersHistoryPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("OrdersHistoryPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrdersHistoryPage getOrders={fn} orders={[]} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
