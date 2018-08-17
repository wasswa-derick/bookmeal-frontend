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
      meals: [],
      menuDate: "2019-04-09"
    };
    const history = {
      push: jest.fn
    };
    wrapper = shallow(
      <EditMenu
        match={match}
        setMessage={jest.fn}
        getMeals={fn}
        meals={[]}
        menu={menu}
        getMenu={fn}
        editMenu={fn}
        history={history}
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
