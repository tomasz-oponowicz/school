import React from "react";
import {ChangePassword} from "../change_password";
import {expect} from "chai";
import sinon from "sinon";
import {shallow} from "enzyme";

describe("Component: ChangePassword", () => {
  const defaultProps = {
    profile: {
      email: "no-reply@example.com"
    },
    changePassword: () => {},

    fields: {
      oldPassword: {},
      newPassword: {}
    },
    handleSubmit: fn => fn,
    submitting: false
  };

  it("should render a form", () => {
    const props = Object.assign({}, defaultProps);
    const wrapper = shallow(<ChangePassword {...props} />);

    expect(wrapper.find("#old-password").length).to.be.equal(1);
    expect(wrapper.find("#new-password").length).to.be.equal(1);
  });

  it("should change password on submit", () => {
    const props = Object.assign({}, defaultProps, {
      changePassword: sinon.spy()
    });
    const wrapper = shallow(<ChangePassword {...props} />);

    wrapper.find("form").simulate("submit");

    expect(props.changePassword.calledOnce).to.be.ok;
    expect(props.changePassword.calledWith({
      email: props.profile.email
    })).to.be.ok;
  });
});
