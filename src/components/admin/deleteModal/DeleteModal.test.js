import React from "react";
import { shallow } from "enzyme";
import DeleteModal from "./DeleteModal";

describe("delete modal", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <DeleteModal title="something" confirmDeletion={jest.fn} />
    );
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
