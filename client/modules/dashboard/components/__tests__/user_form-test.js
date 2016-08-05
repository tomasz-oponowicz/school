import React from "react";
import UserForm from "../user_form";
import {expect} from "chai";
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import {reducer as formReducer} from "redux-form";
import sinon from "sinon";
import merge from "deepmerge";

describe("Component: UserForm", () => {
  const defaultState = {
    profile: {
      role: "admin"
    }
  };
  const defaultProps = {
    email: "john@example.com",
    onSave: () => {},
    withCancel: undefined
  };

  function setup(initialState, element) {
    const store = createStore(
      combineReducers({
        form: formReducer,
        profile: () => initialState.profile
      })
    );

    return mount(
      <Provider store={store}>
        {element}
      </Provider>
    );
  }

  it("should render email, name and role", () => {
    const wrapper = setup(defaultState, <UserForm {...defaultProps}/>);

    expect(wrapper.find("input[id='email']").length).to.equal(1);
    expect(wrapper.find("input[id='name']").length).to.equal(1);
    expect(wrapper.find("select[id='role']").length).to.equal(1);
  });

  it("should valid if name not blank", () => {
    const name = "";

    const wrapper = setup(defaultState, <UserForm {...defaultProps}/>);

    wrapper.find("input[id='name']").simulate("change", {target: {value: name}});
    wrapper.find("form").simulate("submit");

    expect(wrapper.find(".test-name").find(".has-error").length).to.be.equal(1);
  });

  it("should valid if role not blank", () => {
    const role = "";

    const wrapper = setup(defaultState, <UserForm {...defaultProps}/>);

    wrapper.find("select[id='role']").simulate("change", {target: {value: role}});
    wrapper.find("form").simulate("submit");

    expect(wrapper.find(".test-role").find(".has-error").length).to.be.equal(1);
  });

  it("should save on submit", () => {
    const name = "John", role = "student";

    const props = merge(defaultProps, {
      onSave: sinon.spy()
    });

    const wrapper = setup(defaultState, <UserForm {...props}/>);

    wrapper.find("input[id='name']").simulate("change", {target: {value: name}});
    wrapper.find("select[id='role']").simulate("change", {target: {value: role}});
    wrapper.find("form").simulate("submit");

    expect(props.onSave.calledOnce).to.be.ok;
    expect(props.onSave.calledWith({name, role})).to.be.ok;
  });
});
