import React from "react";
import { shallow } from "enzyme";
import { CustomerOrdersPage } from "./CustomerOrdersPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("CustomerOrdersPage", () => {
  let wrapper;
  beforeEach(() => {
    const menu = {
      id: 1,
      title: "test menu",
      description: "lorem desc",
      meals: [{ id: 1, title: "test meal", price: 1000, description: "desc" }]
    };
    wrapper = shallow(
      <CustomerOrdersPage
        getMyOrders={fn}
        getMenu={fn}
        menu={menu}
        modifyOrder={fn}
        orders={[]}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
