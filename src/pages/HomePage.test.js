import React from "react";
import { shallow } from "enzyme";
import { HomePage } from "./HomePage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

const asyncMockFn = () => Promise.resolve({});

describe("HomePage", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    const history = {
      push: mockFn
    };

    const menus = [
      {
        id: 1,
        title: "menu title",
        menuDate: "2018-06-01",
        meals: [],
        description: "meal desc"
      }
    ];

    wrapper = shallow(
      <HomePage
        getTodayMenus={asyncMockFn}
        menus={menus}
        orderMeals={fn}
        isUserAuthenticated={false}
        setMessage={jest.fn}
        history={history}
      />
    );
  });

  it("should handle makeOrder", () => {
    const evt = {};
    wrapper.instance().viewMeals(evt, 1);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
