import React from "react";
import {reduxForm} from "redux-form";
import {notBlank} from "../services/validation";
import Input from "../components/input";
import {changePassword} from "../actions/authentication";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "oldPassword");
  notBlank(values, errors, "newPassword");

  return errors;
};

export class ChangePassword extends React.Component {
  onSave(data) {
    const {profile: {email}, changePassword} = this.props;
    changePassword({email, ...data});
  }
  render() {
    const {fields: {oldPassword, newPassword}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSave.bind(this))}>
        <Input field={oldPassword} id="old-password" type="password" placeholder="Old Password" />
        <Input field={newPassword} id="new-password" type="password" placeholder="New Password" />
        <button disabled={submitting} type="submit" className="btn btn-default">Change</button>
      </form>
    );
  }
}

ChangePassword.propTypes = {
  profile: React.PropTypes.object.isRequired,
  changePassword: React.PropTypes.func.isRequired,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "changePassword",
    fields: ["oldPassword", "newPassword"],
    validate
  },
  state => ({profile: state.profile}),
  {changePassword}
)(ChangePassword);
