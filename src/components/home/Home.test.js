import React from "react";
import { shallow } from "enzyme";
import { Home } from "./Home";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

const asyncMockFn = () => Promise.resolve({});

describe("Home", () => {
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
        description: "meal desc",
        catering: {
          name: "Solo"
        }
      }
    ];

    wrapper = shallow(
      <Home
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
    expect(mockFn.mock.calls.length).toEqual(2);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
