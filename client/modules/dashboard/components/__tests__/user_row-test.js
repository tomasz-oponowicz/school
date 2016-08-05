import React from "react";
import UserRow from "../user_row";
import {expect} from "chai";
import merge from "deepmerge";
import {shallow} from "enzyme";

describe("Component: UserRow", () => {
  const defaultProps = {
    id: "111-111",
    email: "john@example.com",
    name: "John",
    role: "student"
  };

  it("should render name, email and role", () => {
    const props = merge(defaultProps, {
      email: "john@example.com",
      name: "John",
      role: "student"
    });

    const wrapper = shallow(<UserRow {...props} />);

    expect(wrapper.find(".test-name").text()).to.equal(props.name);
    expect(wrapper.find(".test-email").text()).to.equal(props.email);
    expect(wrapper.find(".test-role").text()).to.equal(props.role);
  });

  it("should render an edit button", () => {
    const props = merge(defaultProps, {
      id: "111-111"
    });
    const wrapper = shallow(<UserRow {...props} />);

    expect(wrapper.find(".test-edit").props().to).to.contain(props.id);
  });
});
