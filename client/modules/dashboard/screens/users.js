import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {getUsers} from "../actions/users";
import Loader from "../components/loader";
import UserRow from "../components/user_row";

class Users extends React.Component {
  componentWillMount() {
    this.props.getUsers();
  }
  onLoaded() {
    const {items} = this.props.users;

    return (
      <table className="table table-striped vertical-align">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th className="text-right">Action</th>
        </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return <UserRow {...item} key={item.id} />;
          })}
        </tbody>
      </table>
    );
  }
  render() {
    const {isFetching} = this.props.users;

    return (
      <div>
        <p className="text-muted pull-right">Sorted by <i>Name</i> (asc)</p>
        <Link to="/user/new" className="btn btn-sm btn-default margin-bottom__md">Create user</Link>
        <div className="clearfix">
          <Loader flag={isFetching} onLoaded={this.onLoaded.bind(this)} />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: React.PropTypes.object.isRequired,
  getUsers: React.PropTypes.func.isRequired
};

export default connect(
  state => ({users: state.users}),
  {getUsers}
)(Users);
