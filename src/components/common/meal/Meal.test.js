import React from "react";
import { mount } from "enzyme";
import Meal from "./Meal";

describe("Meal Component", () => {
  let wrapper;
  beforeEach(() => {
    const meal = {
      id: 1,
      title: "test meal",
      price: 20000,
      description: "lorem"
    };
    wrapper = mount(<Meal meal={meal} delete={jest.fn} />);
  });

  it("should display title,price and description details", () => {
    expect(wrapper.find("p").text()).toBe("lorem");
    expect(wrapper.find("label").text()).toBe("UGX 20000");
    expect(wrapper.find("h6").text()).toContain("test meal");
  });
  it("should able to delete self", () => {
    const spy = jest.spyOn(wrapper.instance(), "delete");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(".btn-del").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
