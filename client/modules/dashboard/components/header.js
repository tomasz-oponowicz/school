import React from "react";
import Logo from "./logo";
import {Link} from "react-router";
import TabLink from "../components/tab_link";
import {connect} from "react-redux";
import {DEFAULT_PATH, LOGIN_PATH} from "../constants";
import {signOut} from "../actions/authentication";
import PrivilegedSection from "./privileged_section";

export class Header extends React.Component {
  onSignOut(e) {
    e.preventDefault();
    this.props.signOut();
  }
  render() {
    const {uid, name} = this.props.profile;

    if (!uid) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="margin-bottom__lg">
                <h1 className="text-center"><Logo /></h1>
                <ul className="nav nav-tabs">
                  <TabLink className="test-sign-in" to={LOGIN_PATH}>Sign in</TabLink>
                  <TabLink className="test-sign-up" to="/signup">Sign up</TabLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to={DEFAULT_PATH} className="navbar-brand"><Logo /></Link>
          </div>
          <div>
            <ul className="nav navbar-nav">
              <TabLink to="/lessons">Lessons</TabLink>
              <PrivilegedSection roles={["admin"]}>
                <TabLink to="/users">Users</TabLink>
              </PrivilegedSection>
            </ul>
            <p className="navbar-text navbar-right margin-right__sm">
              <Link to="/profile" className="navbar-link">{name}</Link>
              {" "}
              (<a className="test-sign-out" onClick={this.onSignOut.bind(this)} href="#">sign out</a>)
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  profile: React.PropTypes.object.isRequired,
  signOut: React.PropTypes.func.isRequired
};

export default connect(
  state => ({profile: state.profile}),
  {signOut}
)(Header);
