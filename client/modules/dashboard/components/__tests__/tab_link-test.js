import React from "react";
import {TabLink} from "../tab_link";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: TabLink", () => {
  it("should render a link", () => {
    const label = "Foo";
    const props = {
      to: "/foo",
      location: {
        current: "/bar"
      }
    };
    const wrapper = shallow(<TabLink {...props}>{label}</TabLink>);

    const link = wrapper.find("Link");
    expect(link.props().to).to.equal(props.to);
    expect(link.children().text()).to.equal(label);
  });

  it("should highlight a link if active", () => {
    const props = {
      to: "/foo",
      location: {
        current: "/foo"
      }
    };
    const wrapper = shallow(<TabLink {...props}>Foo</TabLink>);
    expect(wrapper.find(".active").length).to.be.equal(1);
  });

  it("should not highlight a link if inactive", () => {
    const props = {
      to: "/foo",
      location: {
        current: "/bar"
      }
    };
    const wrapper = shallow(<TabLink {...props}>Foo</TabLink>);
    expect(wrapper.find(".active").length).to.be.equal(0);
  });
});
