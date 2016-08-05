import React from "react";
import {signUp} from "../actions/authentication";
import {reduxForm} from "redux-form";
import {notBlank, equalsTo} from "../services/validation";
import Input from "../components/input";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "email");
  notBlank(values, errors, "name");
  notBlank(values, errors, "password");
  equalsTo(values, errors, "retypedPassword", values.password);

  return errors;
};

class SignUp extends React.Component {
  onSubmit(data) {
    this.props.signUp(data.email, data.password, data.name);
  }
  render() {
    const {fields: {email, name, password, retypedPassword}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Input field={email} extraClass="form-group-lg" id="email" type="email" placeholder="Email"/>
        <Input field={name} extraClass="form-group-lg" id="name" type="text" placeholder="Name"/>
        <Input field={password} extraClass="form-group-lg" id="password" type="password" placeholder="Password"/>
        <Input field={retypedPassword} extraClass="form-group-lg" id="retypedPassword" type="password"
               placeholder="Confirm Password"/>
        <button disabled={submitting} type="submit" className="btn btn-lg btn-primary">Sign up</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  signUp: React.PropTypes.func.isRequired,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "signUp",
    fields: ["email", "name", "password", "retypedPassword"],
    validate
  },
  state => ({}),
  {signUp}
)(SignUp);
