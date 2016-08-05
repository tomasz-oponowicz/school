import React from "react";
import {Link} from "react-router";

export default function UserRow(props) {
  const {id, email, name, role} = props;

  return (
    <tr>
      <td className="test-name">{name}</td>
      <td className="test-email">{email}</td>
      <td className="test-role">{role}</td>
      <td className="text-right">
        <Link to={`/user/${id}/edit`} className="btn btn-sm btn-default test-edit">Edit</Link>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  id: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired
};
