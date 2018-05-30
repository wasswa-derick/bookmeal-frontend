import React from "react";
import { shallow } from "enzyme";
import { EditMealPage } from "./EditMealPage";

const err = {
  response: {
    status: 400
  }
};
const fn = () => Promise.reject(err);

describe("EditMealPage", () => {
  let wrapper;
  beforeEach(() => {
    const meal = {
      id: 0,
      title: "",
      description: "",
      price: 0
    };
    const history = {
      pathname: "",
      push: jest.fn
    };
    const match = { params: { id: "1" } };

    wrapper = shallow(
      <EditMealPage
        meal={meal}
        getMeal={fn}
        match={match}
        editMeal={fn}
        history={history}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
