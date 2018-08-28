import React from "react";
import { mount } from "enzyme";
import { Order } from "./Order";

const fn = data => Promise.resolve(data);

describe("Order", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    const history = {
      push: mockFn
    };
    const match = {
      params: {
        id: "1"
      }
    };

    const menu = {
      id: 1,
      title: "",
      description: "",
      menuDate: "",
      meals: [{ id: 1, title: "", description: "", price: 1000 }]
    };
    wrapper = mount(
      <Order
        menu={menu}
        history={history}
        setMessage={mockFn}
        postOrder={fn}
        getMenu={fn}
        match={match}
      />
    );
  });

  it("should handle cancelOrder and makeOrder", () => {
    wrapper.instance().cancelOrder();
    wrapper.instance().makeOrder();
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should increment or decrement count", () => {
    const evt = {};
    const { order } = wrapper.instance().state;
    expect(order.orderCount).toBe(1);

    // increment count by 1
    wrapper.instance().incrementCount(evt, true);

    const { orderCount } = wrapper.instance().state.order;
    expect(orderCount).toBe(2);

    // then decrement the count by 1
    wrapper.instance().incrementCount(evt, false);
    expect(wrapper.instance().state.order.orderCount).toBe(1);
  });

  it("should add or remove meal to  orders when checked is called", () => {
    const evt = {
      target: { checked: true }
    };
    expect(wrapper.instance().state.order.meals.length).toEqual(0);

    // check the meal to add it to order
    wrapper.instance().checked(evt, 1);
    expect(wrapper.instance().state.order.meals.length).toEqual(1);

    // un check the meal to remove it from order
    evt.target.checked = false;
    wrapper.instance().checked(evt, 1);
    expect(wrapper.instance().state.order.meals.length).toEqual(0);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
