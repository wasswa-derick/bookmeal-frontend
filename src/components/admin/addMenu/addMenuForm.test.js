import React from "react";
import { shallow } from "enzyme";
import AddMenuForm from "./addMenuForm";

describe("AddMenu", () => {
  let wrapper;
  beforeEach(() => {
    const data = {
      id: 0,
      title: "",
      description: ""
    };
    const errors = {};
    const menuDate = {};
    wrapper = shallow(
      <AddMenuForm
        data={data}
        errors={errors}
        menuDate={menuDate}
        meals={[]}
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
