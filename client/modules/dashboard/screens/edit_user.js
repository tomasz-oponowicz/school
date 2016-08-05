import React from "react";
import Loader from "../components/loader";
import {getUser, updateUser} from "../actions/users";
import {connect} from "react-redux";
import UserForm from "../components/user_form";

class EditUser extends React.Component {
  componentWillMount() {
    const {params: {id}, getUser} = this.props;
    getUser(id);
  }
  onSave(user) {
    const {params: {id}, updateUser} = this.props;
    updateUser(id, user, true);
  }
  onLoaded() {
    const user = this.props.user.item;
    return <UserForm email={user.email} initialValues={user} onSave={this.onSave.bind(this)} withCancel={true} />;
  }
  render() {
    const {user: {isFetching}} = this.props;
    return <Loader flag={isFetching} onLoaded={this.onLoaded.bind(this)} />;
  }
}

EditUser.propTypes = {
  user: React.PropTypes.object.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  getUser: React.PropTypes.func.isRequired
};

export default connect(
  state => ({user: state.user}),
  {getUser, updateUser}
)(EditUser);
