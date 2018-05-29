import React from "react";
import { shallow } from "enzyme";
import { MealsPage } from "./MealsPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("MealsPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MealsPage
        getMeals={fn}
        logoutUser={fn}
        setMessage={fn}
        postMeal={fn}
        meals={[]}
      />
    );
  });

  it("should render a form for creating a meal", () => {});

  it("should validate data", () => {
    wrapper.instance().onSubmit();
    const { errors } = wrapper.instance().state;
    expect(errors.title).toBe("This field is required");
    expect(errors.price).toBe("This field is required");
    expect(errors.description).toBe("This field is required");
  });

  it("should change state on target element value change", () => {
    const evt = {
      target: { name: "price", value: 1000 }
    };
    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.price).toEqual(1000);
  });

  // TODO: refactor test to pass
  //   it("should call onsubmit when submiting form", () => {
  //     const spy = jest.spyOn(wrapper.instance(), "onSubmit");
  //     wrapper.instance().forceUpdate();
  //     expect(spy).toHaveBeenCalledTimes(0);
  //     wrapper.find(".btn-save").simulate("click");
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
