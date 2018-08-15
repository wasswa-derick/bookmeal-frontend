import React from "react";
import { shallow } from "enzyme";
import { EditMenu } from "./EditMenu";

const err = {
  response: {
    status: 400,
    data: {
      errors: {}
    }
  }
};

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
      menuDate: ""
    };
    wrapper = shallow(<EditMenu match={match} menu={menu} getMenu={fn} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
