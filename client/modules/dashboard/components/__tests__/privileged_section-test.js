import React from "react";
import {PrivilegedSection} from "../privileged_section";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: PrivilegedSection", () => {
  it("should render without children", () => {
    const props = {
      profile: {
        role: "admin"
      },
      roles: [
        "admin"
      ]
    };
    const wrapper = shallow(<PrivilegedSection {...props} />);
    expect(wrapper.children().length).to.equal(0);
  });

  it("should be hidden if insufficient role", () => {
    const props = {
      profile: {
        role: "student"
      },
      roles: [
        "admin"
      ]
    };
    const wrapper = shallow(<PrivilegedSection {...props} />);
    expect(wrapper.hasClass("hidden")).to.be.true;
  });

  it("should be visible if sufficient role", () => {
    const props = {
      profile: {
        role: "admin"
      },
      roles: [
        "admin"
      ]
    };
    const wrapper = shallow(<PrivilegedSection {...props} />);
    expect(wrapper.props().className).to.be.undefined;
  });

  it("should render children", () => {
    const props = {
      profile: {
        role: "admin"
      },
      roles: [
        "admin"
      ]
    };
    const wrapper = shallow(<PrivilegedSection {...props} ><div /><div /></PrivilegedSection>);
    expect(wrapper.find("div").length).to.equal(2);
  });
});
