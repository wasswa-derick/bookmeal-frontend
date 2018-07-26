import React from "react";
import { mount } from "enzyme";
import { MealsPage } from "./MealsPage";

const err = {
  response: {
    status: 400,
    data: {
      errors: {
        form: "some test error for form"
      }
    }
  }
};
const fn = () => Promise.reject(err);

describe("MealsPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MealsPage getMeals={fn} postMeal={fn} meals={[]} deleteMeal={fn} />
    );
  });

  it("should render a form for creating a meal", () => {
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should submit on click of save button", () => {
    // set data to non-empty fields to allow successful submission
    wrapper.setState({
      data: {
        title: "meal title",
        price: 2000,
        description: "meal desc"
      }
    });

    const spy = jest.spyOn(wrapper.instance(), "onSubmit");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper
      .find(".btn-save")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should change state on target element value change", () => {
    const evt = {
      target: { name: "price", value: 1000 }
    };
    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.price).toEqual(1000);
  });

  it("should validate data", () => {
    const data = {
      title: "",
      price: "",
      description: ""
    };
    let errors = wrapper.instance().validate(data);
    expect(errors.title).toEqual("This field is required");
    expect(errors.description).toEqual("This field is required");
    expect(errors.price).toEqual("This field is required");

    data.price = -1;
    errors = wrapper.instance().validate(data);
    expect(errors.price).toEqual("Price value cannot be less or equal to zero");

    // test that price should only be values
    data.price = "price";
    errors = wrapper.instance().validate(data);
    expect(errors.price).toEqual("Price value should be a number");
  });

  it("should call on confirmation of meal deletion", () => {
    // first set meal id to delete
    wrapper.instance().deleteMeal(1);
    const spy = jest.spyOn(wrapper.instance(), "confirmDeletion");
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    wrapper
      .find(".btn-del")
      .first()
      .simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
