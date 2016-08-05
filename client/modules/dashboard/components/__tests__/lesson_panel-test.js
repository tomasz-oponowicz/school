import React from "react";
import LessonPanel from "../lesson_panel";
import {expect} from "chai";
import merge from "deepmerge";
import {shallow} from "enzyme";

describe("Component: LessonPanel", () => {
  const defaultProps = {
    id: "111-111",
    title: "React: Introduction",
    date: "2016-07-27",
    description: undefined,
    status: undefined
  };

  it("should render title, date and description", () => {
    const props = merge(defaultProps, {
      id: "111-111",
      title: "React: Introduction",
      date: "2016-07-27",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    });

    const wrapper = shallow(<LessonPanel {...props} />);

    const title = wrapper.find(".test-title");
    expect(title.children().text()).to.equal(props.title);
    expect(title.props().to).to.contain(props.id);

    expect(wrapper.find(".test-date").text()).to.contain(props.date);
    expect(wrapper.find(".test-description").text()).to.contain(props.description);
  });

  it("should render an attendance button with specified status", () => {
    const props = merge(defaultProps, {
      status: "confirmed",
    });

    const wrapper = shallow(<LessonPanel {...props} />);
    const button = wrapper.find(".test-button");

    expect(button.props().lessonId).to.equal(props.id);
    expect(button.props().status).to.equal(props.status);
  });

  it("should limit a description if too long", () => {
    const props = merge(defaultProps, {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu aliquam tortor. Proin feugiat " +
      "elementum nulla eu viverra. Vestibulum sagittis imperdiet mattis. Nunc bibendum pulvinar erat vel tincidunt. " +
      "Nam ut semper mi. Phasellus nec venenatis lorem, at luctus arcu. Sed ligula elit, tristique sit amet laoreet " +
      "ut, dignissim et nunc. Duis dui erat, ultricies a mi eu, vehicula gravida nunc. Maecenas sed luctus diam. " +
      "Integer in enim gravida orci posuere lobortis vitae vitae lectus. Suspendisse volutpat egestas libero, " +
      "at ornare ligula.",
    });

    const wrapper = shallow(<LessonPanel {...props} />);
    const text = wrapper.find(".test-description").text();

    expect(text.length).to.equal(93);
    expect(text).to.contain("...");
  });
});
