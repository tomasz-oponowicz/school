import React from "react";
import Input from "../input";
import {expect} from "chai";
import merge from "deepmerge";
import {shallow} from "enzyme";

describe("Component: Input", () => {
  const defaultProps = {
    id: "username-input",
    type: "text",
    field: {},
    label: undefined,
    placeholder: undefined,
    extraClass: undefined
  };

  it("should render an input", () => {
    const props = merge(defaultProps, {
      id: "username-input",
      type: "text",
      placeholder: "Enter Username",
    });

    const wrapper = shallow(<Input {...props} />);
    const input = wrapper.find("input");

    expect(input.props().id).to.equal(props.id);
    expect(input.props().type).to.equal(props.type);
    expect(input.props().placeholder).to.equal(props.placeholder);
  });

  it("should render a label", () => {
    const props = merge(defaultProps, {
      id: "username-input",
      label: "Username",
    });

    const wrapper = shallow(<Input {...props} />);
    const label = wrapper.find("label");

    expect(label.props().htmlFor).to.equal(props.id);
    expect(label.text()).to.equal(props.label);
  });

  it("should render an error if invalid", () => {
    const props = merge(defaultProps, {
      field: {
        touched: true,
        error: "Can't be empty"
      }
    });

    const wrapper = shallow(<Input {...props} />);

    expect(wrapper.find(".test-field").props().className).to.contain("has-error");
    expect(wrapper.find(".test-error").text()).to.equal(props.field.error);
  });
});
