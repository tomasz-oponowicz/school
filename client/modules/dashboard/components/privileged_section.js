import React, {Children} from "react";
import {connect} from "react-redux";

export function PrivilegedSection(props) {
  const {profile: {role}, roles, children} = props;

  if (roles.lastIndexOf(role) === -1) {
    return <span className="hidden" />;
  }

  if (Children.count(children) === 0) {
    return <span/>;
  }

  return Children.count(children) > 1 ? <span>{children}</span> : Children.only(children);
}

PrivilegedSection.propTypes = {
  profile: React.PropTypes.object.isRequired,
  roles: React.PropTypes.array.isRequired
};

export default connect(
  state => ({profile: state.profile}),
  {}
)(PrivilegedSection);
