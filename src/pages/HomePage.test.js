import React from "react";
import { shallow } from "enzyme";
import { HomePage } from "./HomePage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("HomePage", () => {
  let wrapper;
  beforeEach(() => {
    const history = {
      push: jest.fn
    };
    wrapper = shallow(
      <HomePage
        getTodayMenus={fn}
        menus={[]}
        orderMeals={fn}
        isUserAuthenticated={false}
        setMessage={jest.fn}
        history={history}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
