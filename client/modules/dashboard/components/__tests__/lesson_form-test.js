import React from "react";
import {LessonForm} from "../lesson_form";
import {expect} from "chai";
import merge from "deepmerge";
import sinon from "sinon";
import {shallow} from "enzyme";

describe("Component: LessonForm", () => {
  const defaultProps = {
    from: "/lessons",
    onSave: () => {},
    isFetching: undefined,

    fields: {
      title: {},
      date: {},
      videoLink: {},
      description: {}
    },
    handleSubmit: fn => fn,
    submitting: undefined
  };

  it("should render title, date, videoLink and description", () => {
    const wrapper = shallow((new LessonForm(defaultProps)).onLoaded());

    expect(wrapper.find("#title").length).to.be.equal(1);
    expect(wrapper.find("#date").length).to.be.equal(1);
    expect(wrapper.find("#videoLink").length).to.be.equal(1);
    expect(wrapper.find("#description").length).to.be.equal(1);
  });

  it("should save on submit", () => {
    const props = merge(defaultProps, {
      onSave: sinon.spy()
    });
    const wrapper = shallow((new LessonForm(props)).onLoaded());

    wrapper.find("form").props().onSubmit();

    expect(props.onSave.calledOnce).to.be.ok;
  });
});
