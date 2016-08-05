import React from "react";
import {Flash} from "../flash";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Component: Flash", () => {
  it("should render a success", () => {
    const props = {
      flash: {
        isError: false, message: "Success"
      }
    };

    const wrapper = shallow(<Flash {...props} />);

    expect(wrapper.props().className).to.equal("alert alert-success");
    expect(wrapper.text()).to.equal(props.flash.message);
  });

  it("should render an error", () => {
    const props = {
      flash: {
        isError: true, message: "Error"
      }
    };

    const tree = shallow(<Flash {...props} />);

    expect(tree.props().className).to.equal("alert alert-danger");
    expect(tree.text()).to.equal(props.flash.message);
  });
});
