import React from "react";
import { shallow } from "enzyme";
import { OrderMealModal } from "./OrderMealModal";

describe("OrderMealModal", () => {
  let wrapper;
  let submitMockFn;
  beforeEach(() => {
    const order = {
      id: 0,
      menuId: 1,
      meals: [],
      totalCost: 0,
      orderCount: 1,
      cost: 0
    };
    const selectedMenu = {
      description: "",
      id: 1,
      meals: [
        { id: 1, title: "meal title", description: "meal desc", price: 5000 }
      ],
      title: "menu title"
    };
    submitMockFn = jest.fn();
    wrapper = shallow(
      <OrderMealModal
        submit={submitMockFn}
        selectedMenu={selectedMenu}
        order={order}
      />
    );
  });

  it("should increment or decrement order count", () => {
    const evt = {};
    const { order } = wrapper.instance().state;
    expect(order.orderCount).toBe(1);

    // increment count by 1
    wrapper.instance().incrementCount(evt, true);

    const { orderCount } = wrapper.instance().state.order;
    expect(orderCount).toBe(2);

    // then decrement the count
    wrapper.instance().incrementCount(evt, false);
    expect(wrapper.instance().state.order.orderCount).toBe(1);
  });

  it("should call make order", () => {
    wrapper.instance().makeOrder();
    expect(submitMockFn.mock.calls.length).toEqual(1);
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
