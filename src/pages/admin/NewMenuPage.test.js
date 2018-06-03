import React from "react";
import { shallow } from "enzyme";
import { NewMenuPage } from "./NewMenuPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("NewMenuPage", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(
      <NewMenuPage
        setMessage={fn}
        getMeals={fn}
        meals={[]}
        addMenu={fn}
        history={history}
      />
    );
  });

  it("should validate data on submit", () => {
    wrapper.instance().onSubmit();
    const { errors } = wrapper.instance().state;
    expect(errors.title).toBe("This field is required");
    expect(errors.description).toBe("This field is required");
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
