import React from "react";
import {reduxForm} from "redux-form";
import {notBlank} from "../services/validation";
import Input from "../components/input";
import PrivilegedSection from "../components/privileged_section";
import {Link} from "react-router";

const validate = values => {
  const errors = {};

  notBlank(values, errors, "name");
  notBlank(values, errors, "role");

  return errors;
};

export function UserForm(props) {
  const {email, fields: {name, role}, handleSubmit, submitting, onSave, withCancel} = props;

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="form-group">
        <label htmlFor="email" className="control-label">Email</label>
        <input value={email} id="email" type="email" className="form-control" placeholder="Email" readOnly />
      </div>
      <Input field={name} label="Name" id="name" type="text" placeholder="Name" extraClass="test-name"/>
      <PrivilegedSection roles={["admin"]}>
        <div className={`test-role form-group ${role.touched && role.error && "has-error"}`}>
          <label htmlFor="role" className="control-label">Role</label>
          <select {...role} id="role" className="form-control">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </PrivilegedSection>
      <button disabled={submitting} type="submit" className={`btn ${withCancel ? "btn-primary" : "btn-default"}`}>
        Save
      </button>
      {withCancel && <Link to="/users" className="btn btn-default margin-left__md">Cancel</Link>}
    </form>
  );
}

UserForm.propTypes = {
  email: React.PropTypes.string.isRequired,
  withCancel: React.PropTypes.bool,
  onSave: React.PropTypes.func.isRequired,

  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool
};

export default reduxForm(
  {
    form: "userForm",
    fields: ["name", "role"],
    validate
  },
  state => ({}),
  {}
)(UserForm);
