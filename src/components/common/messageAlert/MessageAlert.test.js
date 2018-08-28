import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import MessageAlert from "./MessageAlert";
import mockStore from "../../../utils/mockStore";

const store = mockStore({});

describe("Message Alert", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <MessageAlert text="test msg" show={false} />
      </Provider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
