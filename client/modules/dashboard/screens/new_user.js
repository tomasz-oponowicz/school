import React from "react";
import {Link} from "react-router";
import {createUser} from "../actions/users";
import {reduxForm} from "redux-form";
import {notBlank, equalsTo} from "../services/validation";
import Input from "../components/input";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "email");
  notBlank(values, errors, "name");
  notBlank(values, errors, "password");
  equalsTo(values, errors, "retypedPassword", values.password);
  notBlank(values, errors, "role");

  return errors;
};

class NewUser extends React.Component {
  onSave(data) {
    this.props.createUser(data);
  }
  render() {
    const {fields: {email, name, password, retypedPassword, role}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSave.bind(this))}>
        <Input field={email} label="Email" id="email" type="email" placeholder="Email" />
        <Input field={name} label="Name" id="name" type="text" placeholder="Name" />
        <Input field={password} label="Password" id="password" type="password" placeholder="Password" />
        <Input field={retypedPassword} label="Confirm Password" id="retypedPassword" type="password" placeholder="Confirm Password" />
        <div className="form-group">
          <label htmlFor="role" className="control-label">Role</label>
          <select {...role} id="role" className="form-control">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button disabled={submitting} type="submit" className="btn btn-primary">Save</button>
        <Link to="/users" className="btn btn-default margin-left__md">Cancel</Link>
      </form>
    );
  }
}

NewUser.propTypes = {
  createUser: React.PropTypes.func.isRequired,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "newUser",
    fields: ["email", "name", "password", "retypedPassword", "role"],
    validate
  },
  state => ({initialValues: {role: "student"}}),
  {createUser}
)(NewUser);
