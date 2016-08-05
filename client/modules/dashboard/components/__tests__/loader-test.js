import React from "react";
import Loader from "../loader";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: Loader", () => {
  it("should render wait indicator when loading", () => {
    const props = {
      flag: true,
      onLoaded: () => {}
    };

    const wrapper = shallow(<Loader {...props} />);
    expect(wrapper.find(".loader").text()).to.equal("Loading...");
  });

  it("should render children when loaded", () => {
    const props = {
      flag: false,
      onLoaded: () => (<div id="child"></div>) // eslint-disable-line react/display-name
    };

    const wrapper = shallow(<Loader {...props} />);
    expect(wrapper.find("#child").length).to.be.equal(1);
  });
});
