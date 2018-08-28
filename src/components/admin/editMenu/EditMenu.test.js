import React from "react";
import { shallow } from "enzyme";
import { EditMenu } from "./EditMenu";

const fn = () => Promise.resolve();

describe("EditMenu", () => {
  let wrapper;
  beforeEach(() => {
    const match = {
      params: { id: "1" }
    };
    const menu = {
      id: 0,
      title: "",
      description: "",
      meals: [{ id: 1, title: "meal" }],
      menuDate: "2019-04-09"
    };
    const history = {
      push: jest.fn()
    };
    const meals = [
      { id: 1, title: "meal", price: 2000, description: "desc" },
      { id: 2, title: "meal 2", price: 2000, description: "desc" }
    ];
    wrapper = shallow(
      <EditMenu
        match={match}
        setMessage={jest.fn}
        getMeals={fn}
        meals={meals}
        menu={menu}
        getMenu={fn}
        editMenu={fn}
        history={history}
      />
    );
  });

  it("validates data", () => {
    const data = {
      title: "",
      description: ""
    };
    const expectedErrors = {
      title: "This field is required",
      description: "This field is required",
      menu_date: "This field is required"
    };
    wrapper.instance().setState({ menuDate: null });
    const errors = wrapper.instance().validate(data);
    expect(errors).toEqual(expectedErrors);
  });

  it("should change state on input value changes", () => {
    const evt = {
      target: {
        name: "title",
        value: "new title",
        files: ["file"]
      }
    };
    const date = "09/12/2018";
    wrapper.instance().onChange(evt);
    wrapper.instance().handleDateChange(date);
    const { data, menuDate } = wrapper.instance().state;
    expect(data.title).toBe(evt.target.value);
    expect(menuDate).toBe(date);
  });

  it("should handle file uploadds", () => {
    const evt = {
      target: {
        files: ["file"]
      }
    };

    wrapper.instance().handleFileUpload(evt);
    const { data } = wrapper.instance().state;
    expect(data.imageFile).toBe(evt.target.files[0]);
  });

  it("should check and un check meal", () => {
    const evt = {
      target: {
        checked: true
      }
    };
    wrapper.instance().checked(evt, 2);
    const { meals } = wrapper.instance().state;
    const meal = meals.find(m => m.id === 2);
    expect(meal.checked).toBe(true);

    evt.target.checked = false;
    wrapper.instance().checked(evt, 1);
    const expectedMeal = meals.find(m => m.id === 1);
    expect(expectedMeal.checked).toBe(false);
  });

  it("should handle submiting form", () => {
    const data = {
      title: "title",
      description: "description"
    };
    wrapper.instance().setState({ data });
    wrapper.instance().onSubmit();
    const { errors } = wrapper.instance().state;
    expect(errors).toEqual({});
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
