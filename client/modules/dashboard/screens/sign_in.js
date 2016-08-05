import React from "react";
import {signIn} from "../actions/authentication";
import {reduxForm} from "redux-form";
import {notBlank} from "../services/validation";
import Input from "../components/input";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "email");
  notBlank(values, errors, "password");

  return errors;
};

class SignIn extends React.Component {
  onSubmit(data) {
    this.props.signIn(data.email, data.password, data.remember);
  }
  render() {
    const {fields: {email, password, remember}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Input field={email} extraClass="form-group-lg" id="email" type="email" placeholder="Email" />
        <Input field={password} extraClass="form-group-lg" id="password" type="password" placeholder="Password" />
        <div className="checkbox">
          <label>
            <input {...remember} type="checkbox"/> Remember me
          </label>
        </div>
        <button disabled={submitting} type="submit" className="btn btn-lg btn-primary">Sign in</button>
      </form>
    );
  }
}

SignIn.propTypes = {
  signIn: React.PropTypes.func.isRequired,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "signIn",
    fields: ["email", "password", "remember"],
    validate
  },
  state => ({}),
  {signIn}
)(SignIn);
