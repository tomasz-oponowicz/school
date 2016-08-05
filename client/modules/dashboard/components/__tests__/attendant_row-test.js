import React from "react";
import {AttendantRow} from "../attendant_row";
import {expect} from "chai";
import sinon from "sinon";
import {shallow} from "enzyme";

describe("Component: AttendantRow", () => {
  const defaultProps = {
    lesson: {item: {id: "111-111"}},
    id: "222-222",
    profile: {uid: "333-333"},
    name: "John Doe",
    status: "",
    updateStatus: () => {}
  };

  it("should render a row", () => {
    const props = Object.assign({}, defaultProps);
    const wrapper = shallow(<AttendantRow {...props} />);

    expect(wrapper.find(".test-name").text()).to.equal(props.name);
  });

  it("should highlight confirm button if confirmed", () => {
    const props = Object.assign({}, defaultProps, {
      status: "confirmed"
    });
    const wrapper = shallow(<AttendantRow {...props} />);

    expect(wrapper.find(".btn-success").length).to.be.equal(1);
    expect(wrapper.find(".btn-danger").length).to.be.equal(0);
  });

  it("should highlight reject button if rejected", () => {
    const props = Object.assign({}, defaultProps, {
      status: "rejected"
    });
    const wrapper = shallow(<AttendantRow {...props} />);

    expect(wrapper.find(".btn-danger").length).to.be.equal(1);
    expect(wrapper.find(".btn-success").length).to.be.equal(0);
  });

  it("should update attendance if confirm clicked", () => {
    const props = Object.assign({}, defaultProps, {
      updateStatus: sinon.spy()
    });
    const wrapper = shallow(<AttendantRow {...props} />);

    wrapper.find(".test-confirm").simulate("click");

    expect(props.updateStatus.calledOnce).to.be.ok;
    expect(props.updateStatus.calledWith(
      props.lesson.item.id,
      props.id,
      props.profile.uid,
      "confirmed",
      true
    )).to.be.ok;
  });

  it("should update attendance if reject clicked", () => {
    const props = Object.assign({}, defaultProps, {
      updateStatus: sinon.spy()
    });
    const wrapper = shallow(<AttendantRow {...props} />);

    wrapper.find(".test-reject").simulate("click");

    expect(props.updateStatus.calledOnce).to.be.ok;
    expect(props.updateStatus.calledWith(
      props.lesson.item.id,
      props.id,
      props.profile.uid,
      "rejected",
      true
    )).to.be.ok;
  });
});
