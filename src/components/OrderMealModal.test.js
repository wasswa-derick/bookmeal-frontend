import React from "react";
import { shallow } from "enzyme";
import { OrderMealModal } from "./OrderMealModal";

describe("OrderMealModal", () => {
  let wrapper;
  beforeEach(() => {
    const order = {
      id: 1,
      menuId: 1,
      meals: [],
      totalCost: 0,
      orderCount: 1,
      cost: 0
    };
    const selectedMenu = {
      description: "",
      id: 0,
      meals: [],
      title: ""
    };
    wrapper = shallow(
      <OrderMealModal
        submit={jest.fn}
        selectedMenu={selectedMenu}
        order={order}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
