import React from "react";
import {Link} from "react-router";
import ChangePassword from "../components/change_password";
import UserForm from "../components/user_form";
import {DEFAULT_PATH} from "../constants";
import {connect} from "react-redux";
import {updateProfile} from "../actions/authentication";

class Profile extends React.Component {
  onUpdateProfile(data) {
    const {profile: {uid, role}, updateProfile} = this.props;
    updateProfile(uid, data, role === "admin");
  }
  render() {
    const {location: {previous}, profile} = this.props;

    return (
      <div>
        <Link to={previous || DEFAULT_PATH} className="btn btn-sm btn-default">
          <span className="glyphicon glyphicon-menu-left"/> Back
        </Link>

        <h3 className="margin-bottom__lg">Profile</h3>

        <UserForm email={profile.email} initialValues={profile} onSave={this.onUpdateProfile.bind(this)} />

        <h3 className="margin-bottom__lg">Password</h3>

        <ChangePassword />
      </div>
    );
  }
}

Profile.propTypes = {
  location: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object.isRequired,
  updateProfile: React.PropTypes.func.isRequired
};

export default connect(
  state => ({location: state.location, profile: state.profile}),
  {updateProfile}
)(Profile);
