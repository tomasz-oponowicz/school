import React from "react";
import {AttendedButton} from "../attended_button";
import {expect} from "chai";
import sinon from "sinon";
import {shallow} from "enzyme";

describe("Component: AttendedButton", () => {
  const defaultProps = {
    lessonId: "111-111",
    profile: {
      uid: "222-222",
      role: "student"
    },
    status: "",
    extraClass: "",
    updateStatus: () => {}
  };

  it("should render a default button", () => {
    const props = Object.assign({}, defaultProps);
    const wrapper = shallow(<AttendedButton {...props} />);

    expect(wrapper.find("button").hasClass("btn-default")).to.be.true;
  });

  it("should render a confirmed button", () => {
    const props = Object.assign({}, defaultProps, {
      status: "confirmed"
    });
    const wrapper = shallow(<AttendedButton {...props} />);

    expect(wrapper.find("button").hasClass("btn-success")).to.be.true;
  });

  it("should render a pending button", () => {
    const props = Object.assign({}, defaultProps, {
      status: "pending"
    });
    const wrapper = shallow(<AttendedButton {...props} />);

    expect(wrapper.find("button").hasClass("btn-info")).to.be.true;
  });

  it("should render a rejected button", () => {
    const props = Object.assign({}, defaultProps, {
      status: "rejected"
    });
    const wrapper = shallow(<AttendedButton {...props} />);

    expect(wrapper.find("button").hasClass("btn-danger")).to.be.true;
  });

  it("should update status when clicked", () => {
    const props = Object.assign({}, defaultProps, {
      lessonId: "111-111",
      profile: {
        uid: "222-222",
        role: "teacher"
      },
      updateStatus: sinon.spy(),
    });
    const wrapper = shallow(<AttendedButton {...props} />);

    wrapper.find("button").simulate("click");

    expect(props.updateStatus.calledOnce).to.be.ok;
    expect(props.updateStatus.calledWith(
      props.lessonId,
      props.profile.uid,
      props.profile.uid,
      "pending",
      true
    )).to.be.ok;
  });
});
