import React from "react";
import { shallow } from "enzyme";
import { OrderPage } from "./OrderPage";
import mockStorage from "../utils/localStorage";

const err = {
  response: {
    status: 400
  }
};
// const fn = () => Promise.reject(err);

const postOrderMockFn = data =>
  new Promise((resolve, reject) => {
    if (data) {
      resolve({});
    }
    reject(err);
  });

describe("OrderPage", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    Object.defineProperty(window, "sessionStorage", {
      value: mockStorage
    });

    mockFn = jest.fn();
    const history = {
      push: mockFn
    };
    const cartOrder = {
      menuId: 1,
      meals: [{ title: "meal lorem", id: 1, price: 1000, description: "desc" }],
      totalCost: 1000,
      orderCount: 1,
      cost: 1000
    };
    wrapper = shallow(
      <OrderPage
        cartOrder={cartOrder}
        history={history}
        setMessage={mockFn}
        postOrder={postOrderMockFn}
        getCartOrder={jest.fn}
      />
    );
  });

  it("should handle cancelOrder and makeOrder", () => {
    wrapper.instance().cancelOrder();
    wrapper.instance().makeOrder();
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
