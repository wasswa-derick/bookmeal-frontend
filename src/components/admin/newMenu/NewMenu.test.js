import React from "react";
import { mount } from "enzyme";
import { NewMenuPage } from "./NewMenu";

const err = {
  response: {
    status: 400,
    data: {
      errors: {}
    }
  }
};
const fn = () => Promise.reject(err);

describe("NewMenuPage", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = mount(
      <NewMenuPage
        setMessage={fn}
        getMeals={fn}
        meals={[]}
        addMenu={fn}
        history={history}
      />
    );
  });

  it("should validate data before submit", () => {
    wrapper.instance().setState({ menuDate: null });
    const { data } = wrapper.instance().state;

    const errors = wrapper.instance().validate(data);
    expect(errors.title).toBe("This field is required");
    expect(errors.description).toBe("This field is required");
  });

  it("should submit form on click of save button", () => {
    wrapper.setState({
      meals: [1],
      data: {
        title: "test title",
        description: "lorem desc"
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

  it("should set state when input values change", () => {
    const evt = {
      target: {
        name: "title",
        value: "menu title"
      }
    };
    wrapper.instance().onChange(evt);
    const { data } = wrapper.instance().state;
    expect(data.title).toBe("menu title");
  });

  it("should add or remove meal to meals list when meal is checked", () => {
    const evt = {
      target: {
        checked: true
      }
    };

    const mealId = 1;

    wrapper.instance().checked(evt, mealId);
    let { meals } = wrapper.instance().state;
    expect(meals).toEqual([mealId]);

    evt.target.checked = false;
    wrapper.instance().checked(evt, mealId);
    meals = [...wrapper.instance().state.meals];

    expect(meals).toEqual([]);
  });
});
