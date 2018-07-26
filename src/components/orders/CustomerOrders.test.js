import React from "react";
import { shallow } from "enzyme";
import { CustomerOrders } from "./CustomerOrders";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);
const asyncMockFn = () => Promise.resolve({});

describe("CustomerOrders", () => {
  let wrapper;
  beforeEach(() => {
    const menu = {
      id: 1,
      title: "test menu",
      description: "lorem desc",
      meals: [{ id: 1, title: "test meal", price: 1000, description: "desc" }]
    };
    wrapper = shallow(
      <CustomerOrders
        getMyOrders={asyncMockFn}
        getMenu={asyncMockFn}
        menu={menu}
        modifyOrder={fn}
        orders={[]}
      />
    );
  });

  it("should handle onSelected", () => {
    const evt = {};
    wrapper.instance().onSelected(evt, { id: 1 });
    // console.log(wrapper.instance().state.selectedMenu);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
