import React from "react";
import Logo from "../logo";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: Logo", () => {
  it("should render icon", () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.props().className).to.equal("glyphicon glyphicon-education");
  });
});
