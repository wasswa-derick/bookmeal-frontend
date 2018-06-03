import React from "react";
import { shallow } from "enzyme";
import { OrderPage } from "./OrderPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("OrderPage", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
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
        setMessage={jest.fn}
        postOrder={fn}
        getCartOrder={fn}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
