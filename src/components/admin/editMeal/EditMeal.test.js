import React from "react";
import { mount } from "enzyme";
import { EditMeal } from "./EditMeal";

const err = {
  response: {
    status: 400,
    data: {
      errors: {
        form: "simulated errors"
      }
    }
  }
};
const fn = () => Promise.reject(err);
const asyncMockFn = () => Promise.resolve({});

describe("EditMeal", () => {
  let wrapper;
  beforeEach(() => {
    const meal = {
      id: 1,
      title: "",
      description: "",
      price: 0
    };

    const history = {
      push: jest.fn()
    };
    const match = { params: { id: "1" } };

    wrapper = mount(
      <EditMeal
        meal={meal}
        getMeal={asyncMockFn}
        match={match}
        editMeal={fn}
        history={history}
      />
    );
  });

  it("should handle onSubmit", () => {
    wrapper.setState({
      data: {
        id: 1,
        title: "meal title",
        description: "meal desc",
        price: 10000
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

  it("should validate data", () => {
    const data = {
      title: "",
      price: "price",
      description: ""
    };
    let errors = wrapper.instance().validate(data);
    expect(errors.title).toEqual("This field is required");
    expect(errors.price).toEqual("Price value should be a number");

    data.price = -1; // change the price to ensure only price greater then zero are accepted
    errors = wrapper.instance().validate(data);
    expect(errors.price).toEqual("Price value cannot be less or equal to zero");
  });

  it("should change state on change of target value", () => {
    const evt = {
      target: {
        name: "title",
        value: "meal title"
      }
    };
    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.title).toBe("meal title");
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
