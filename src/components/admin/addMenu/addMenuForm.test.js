import React from "react";
import { shallow } from "enzyme";
import AddMenuForm from "./addMenuForm";

describe("AddMenu", () => {
  let wrapper;
  beforeEach(() => {
    const menu = {
      id: 0,
      title: "",
      description: "",
      meals: []
    };
    const errors = {};
    const menuDate = {};
    wrapper = shallow(
      <AddMenuForm
        menu={menu}
        errors={errors}
        menuDate={menuDate}
        handleDateChange={jest.fn}
        handleFileUpload={jest.fn}
        onChange={jest.fn}
        onSubmit={jest.fn}
        checked={jest.fn}
        title="title"
      />
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
