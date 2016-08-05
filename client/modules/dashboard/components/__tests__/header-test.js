import React from "react";
import {Header} from "../header";
import {expect} from "chai";
import sinon from "sinon";
import merge from "deepmerge";
import {shallow} from "enzyme";

describe("Component: Header", () => {
  const defaultProps = {
    profile: {
      uid: "111-11",
      name: "John"
    },
    signOut: () => {}
  };

  it("should render name and sign out if authenticated", () => {
    const props = merge(defaultProps, {
      profile: {
        uid: "111-11",
        name: "John"
      }
    });
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper.find(".navbar-link").children().text()).to.equal(props.profile.name);
  });

  it("should render sign in and sign up if not authenticated", () => {
    const props = merge(defaultProps, {
      profile: {
        uid: undefined
      }
    });
    const wrapper = shallow(<Header {...props} />);

    expect(wrapper.find(".test-sign-in").length).to.be.equal(1);
    expect(wrapper.find(".test-sign-up").length).to.be.equal(1);
  });

  it("should sign out on click", () => {
    const props = merge(defaultProps, {
      profile: {
        uid: "111-11"
      },
      signOut: sinon.spy()
    });
    const wrapper = shallow(<Header {...props} />);

    wrapper.find(".test-sign-out").simulate("click", {
      preventDefault: () => {}
    });

    expect(props.signOut.calledOnce).to.be.ok;
  });
});
